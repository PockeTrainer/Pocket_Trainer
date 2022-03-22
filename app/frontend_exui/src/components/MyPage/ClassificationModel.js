import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import * as dfd from 'danfojs'
import * as _ from 'lodash'

// 1. 데이터 수집 후 csv 파일로 변경해서 저장
// - model = classificationModel(input, output);
// - model.addData([inputs], [outputs]);
// - model.saveData('data');

// 2. 수집된 데이터를 불러와서 모델 학습 후 모델 파일 저장
// - model.loadData('./data.csv');
// - model.trainModel(100000, modelTrained);
// - model.saveModel('model');

// 3. 저장된 모델 파일을 불러와서 분류
// - model.loadModel('http://urls....', modelLoaded);
// - model.loadModelFromNativeFileSystem('./model.json', modelLoaded);
// - model.classify([inputs], gotResult);

export class ClassificationModel {
    constructor(input, output) {
        this.model = null;
        this.modelInput = null;
        this.modelOutput = null;

        this.data = null;
        this.appendingData = null;

        this.trainedEpoch = null;
        this.trainedAccuracy = null;

        this.init(input, output);
    }

    init(input, output) {
        this.modelInput = input;
        this.modelOutput = output;

        this.trainedEpoch = 0;
        this.trainedAccuracy = 0.0;

        this.appendingData = [];

        this.createModel();
    }

    // data
    addData(rowObj) {
        console.log('add Data');
        this.appendingData.push(rowObj);
    }

    concatData() {
        console.log('concat Data');
        var newData = new dfd.DataFrame(this.appendingData);
        this.data = _.cloneDeep(newData);
    }

    saveData(fileName) {
        this.concatData();

        dfd.toCSV(this.data, {
            fileName: fileName,
            download: true,
        });
    }

    loadData(filePath, callback=null) {
        dfd.readCSV(filePath)
        .then(dataFrame => {
            this.data = _.cloneDeep(dataFrame);
            console.log('data loaded');
            this.data.print();
            if (callback != null) {
                callback();
            }
        }).catch(e => {
            console.log(e);
        });
    }

    showData() {
        this.data.print();
    }

    // model
    createModel() {
        var inputLayer = tf.input({shape: [this.modelInput]});
        var batchNormalizeLayer = tf.layers.batchNormalization().apply(inputLayer);
        var dropoutLayer = tf.layers.dropout({ rate: 0.6 }).apply(batchNormalizeLayer);
        var hiddenLayer = tf.layers.dense({ 
                                        units: this.modelInput, 
                                        activation: 'relu', 
                                        kernelInitializer: 'heNormal' })
                                    .apply(dropoutLayer);
        var outputLayer = tf.layers.dense({ 
                                        units: this.modelOutput, 
                                        activation: 'softmax'})
                                    .apply(hiddenLayer);
        
        this.model = tf.model({inputs: inputLayer, outputs: outputLayer});
        this.complileModel();
    }

    complileModel() {
        var compileParam = {
            optimizer: tf.train.adam(),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy'],
        }
        this.model.compile(compileParam);
    }

    trainModel(_epochs, inputNames, callback) {
        tfvis.show.modelSummary({name: 'Summary', tab: 'Model'}, this.model);

        var _history = [];
        var fitParam = {
            epochs: _epochs,
            callbacks: {
                onEpochEnd:
                    function(epoch, logs) {
                        console.log('epoch', epoch, logs, 'RMSE=>', Math.sqrt(logs.loss));
                        _history.push(logs);
                        tfvis.show.history({ name: 'loss', tab: 'History' }, _history, ['loss']);
                        tfvis.show.history({ name: 'accuracy', tab: 'History' }, _history, ['acc']);
                    }
            }
        };

        var inputData = _.cloneDeep(this.data.loc({ columns: inputNames }));
        var inputDataTensor = this.getPreProcessedTensor(inputData, this.modelInput);
        console.log('input Tensor');
        // inputDataTensor.print();
        console.log(inputDataTensor.arraySync());

        var encoder = new dfd.OneHotEncoder();
        var output = _.cloneDeep(this.data.loc({ columns: ['targetPose'] }));

        var outputTensorBeforeFit = this.getPreProcessedTensor(output, 1);
        console.log('output Tensor');
        outputTensorBeforeFit.print();

        // tensor 마지막 값 지우고 fit 하도록.
        encoder.fit(outputTensorBeforeFit);
        var outputData = encoder.transform(outputTensorBeforeFit.arraySync());
        console.log('output Data');
        console.log(outputData);
        var outputDataTensor = tf.tensor(outputData);

        // inputDataFrame.tensor.print();


        this.model.fit(inputDataTensor, outputDataTensor, fitParam)
            .then(function (result) {
                // console.log('fit processed');
                callback(result);
            });
    }

    saveModel(modelName='model') {
        this.model.save('downloads://' + modelName);
    }

    loadModel(url, callback) {
        this.model = tf.loadLayersModel(url).then(function(model) {
            callback(model);
        });
    }

    loadModelFromNativeFileSystem(path, callback) {
        this.model = tf.loadLayersModel('file://' + path).then(function(model) {
            callback(model);
        });
    }

    // classification
    classify(rowObj, loadedModel, callback) {
        if (rowObj && loadedModel) {
            var inputData = new dfd.DataFrame([rowObj]);
            // inputData.tensor.print();
            var results = loadedModel.predict(inputData.tensor);
            callback(results);
        }
    }

    // util
    getPreProcessedTensor(dataFrame, rowNum) {
        if (rowNum != 1) {
            var oneDimTensor = tf.tensor(dataFrame.values).reshape([-1, rowNum]);
        }
        else {
            var oneDimTensor = tf.tensor(dataFrame.values).reshape([-1]);
        }

        console.log('one dim tensor');
        oneDimTensor.print();
        var tensor2Array = oneDimTensor.arraySync();
        console.log('tensor to array', tensor2Array);
        tensor2Array.pop();

        return tf.tensor(tensor2Array);
    }
}