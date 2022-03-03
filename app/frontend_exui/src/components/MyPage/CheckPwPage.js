import React, { Component, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../css/MyPage/CheckPwPage.css';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import ml5 from "ml5";
import '@tensorflow/tfjs-backend-webgl';
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import { version_layers } from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-backend-wasm';

import * as cm from './ClassificationModel';

function CheckPwPage() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    // let mode = 'data';
    // let mode = 'train';
    let mode = 'classify';

    let trainEpochs = 100;

    let classifiedPose;
    let ml5Pose;
    let brain;

    let dataFileName = 'NOTHandData';
    // let dataFilePath = './NOTHandData.csv';
    // let dataFilePath = 'https://pocket-trainer.s3.ap-northeast-2.amazonaws.com/NOTHandData.csv';
    let dataFilePath = 'https://raw.githubusercontent.com/Oneul1213/FileStorage/main/NOTHandData.csv';
    
    let modelName = 'NOTHandModel';
    let modelUrl = 'https://raw.githubusercontent.com/Oneul1213/FileStorage/main/NOTHandModel.json';

    let loadedModel = null;

    /* for data collecting...1s */
    if (mode == 'data') {
        var targetPose;
        var state = 'waiting';
    }
    /* for data collecting...1e */

    // const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const runMovenet = async () => {
        // const options = {
        //     inputs: 34,
        //     outputs: 4,
        //     task: 'classification',
        //     debug: true
        // };
        // const options = {
        //     inputs: 22,
        //     outputs: 3,
        //     task: 'classification',
        //     debug: true
        // };
        // brain = ml5.neuralNetwork(options);  //ml5 neuralNetwork 시작
        brain = new cm.ClassificationModel(22, 3);
        console.log('running movenet');
        
        /* for classifying...1s */
        if (mode == 'classify') {
            // const modelInfo = {
            //     model: "https://pocket-trainer.s3.ap-northeast-2.amazonaws.com/model/model.json",
            //     metadata: "https://pocket-trainer.s3.ap-northeast-2.amazonaws.com/model/model_meta.json",
            //     weights: "https://pocket-trainer.s3.ap-northeast-2.amazonaws.com/model/model.weights.bin",
            // };
        }
        /* for classifying...1e */

        /* for classifying...2s */
        if (mode == 'classify') {
            brain.loadModel(modelUrl, modelLoaded);
            // console.log(brain);
        }
        /* for classifying...2e */
        
        /* for data collecting...2s */
        if (mode == 'data') {
            const detector = await poseDetection.createDetector(
                poseDetection.SupportedModels.MoveNet, 
                // detectorConfig,
            )
            setInterval(() => {
                detect(detector);
            }, 100);
        }
        /* for data collecting...2e */
    }

    const detect = async (detector) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
        
            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            const poses = await detector.estimatePoses(video);
            //const poses = await model.estimatePoses(video);

            //brain.classify(poses[0], gotResult);
            // Start image classification

            if (poses.length > 0) { 
                /* for data collecting...3s */
                if (mode == 'data') {
                    collectingData(poses[0]);
                }
                /* for data collecting...3e */

                ml5Pose = poses[0];
                // for classifying...3s
                if (mode == 'classify') {
                    classifyPose();
                }
                // for classifying...3e
                drawCanvas(poses[0], video, videoWidth, videoHeight, canvasRef.current);
            }
        }
    }

    const modelLoaded = async (model) => {
        console.log('model loaded')

        loadedModel = model;

        const detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet, 
            // detectorConfig,
        )
        setInterval(() => {
            detect(detector);
        }, 100);
        
        //console.log(ml5Poses)
        // classifyPose();
    }

    /* for data collecting...4s */
    function collectingData(pose) {
        // console.log(state);
        // console.log(pose);
        if (state == 'collecting') {
            // let inputs = [];
            // let outputs = [];
            let rowObj = {};
            // for (let i = 0; i < pose['keypoints'].length; i++) {
            //     let x = pose['keypoints'][i]['x'];
            //     let y = pose['keypoints'][i]['y'];
            //     inputs.push(x);
            //     inputs.push(y);
            // }

            // temp data collecting s
            for (let i = 0; i < 11; i++) {
                let nameX = pose['keypoints'][i]['name'] + '_X';
                let nameY = pose['keypoints'][i]['name'] + '_Y';
                let x = pose['keypoints'][i]['x'];
                let y = pose['keypoints'][i]['y'];
                // inputs.push(x);
                // inputs.push(y);
                rowObj[nameX] = x;
                rowObj[nameY] = y;

                // outputs.push(targetPose);
                // outputs.push(targetPose);
            }
            rowObj['targetPose'] = targetPose;
            // temp data collecting e
            // let target = [targetPose];
            // brain.addData(inputs, outputs);
            brain.addData(rowObj);
        }
    }
    /* for data collecting...4e */


    /* for classifying...4s */
    const classifyPose = async (model) => {
        //console.log(pose);
        if (ml5Pose) {
            // let inputs = [];
            let rowObj = {};

            // for (let i = 0; i < pose['keypoints'].length; i++) {
            //     let x = pose['keypoints'][i].x;
            //     let y = pose['keypoints'][i].y;
            //     inputs.push(x);
            //     inputs.push(y);
            // }

            // temp classifying s
            for (let i = 0; i < 11; i++) {
                let nameX = ml5Pose['keypoints'][i]['name'] + '_X';
                let nameY = ml5Pose['keypoints'][i]['name'] + '_Y';
                let x = ml5Pose['keypoints'][i]['x'];
                let y = ml5Pose['keypoints'][i]['y'];
                // inputs.push(x);
                // inputs.push(y);
                rowObj[nameX] = x;
                rowObj[nameY] = y;

                // outputs.push(targetPose);
                // outputs.push(targetPose);
            }
            // temp classifying e

            //console.log(inputs)
            brain.classify(rowObj, loadedModel, gotResult);
            // if (results[0].confidence > 0.75) {
            //     classifiedPose = results[0].label;
            //     // console.log(results);
            // }
        } else {
            setTimeout(classifyPose, 100);
        }
    }

    const gotResult = async (results) => {
        // console.log('results: ', results);
        // console.log(results.arraySync());
        // console.log('gotResult start');
        let resultArray = results.arraySync();
        // console.log('resultArray: ', resultArray);
        // console.log('max value: ', Math.max(...resultArray[0]));

        var idx = resultArray[0].findIndex((element, index, array) => {
            if (element == Math.max(...array)) {
                return true;
            }
        });
        // console.log('idx: ', idx);
        // console.log(typeof(idx));

        switch(idx) {
            case 0:
                classifiedPose = 'noHand';
                break;
            case 1:
                classifiedPose = 'oneHand';
                break;
            case 2:
                classifiedPose = 'twoHand';
                break;
            default:
                classifiedPose = 'none';
                break;
        }
        console.log(classifiedPose);
    }
    /* for classifying...4e */

    /* for training...2s */
    function modelTrained(result) {
        console.log('model trained');
        brain.saveModel(modelName);
    }
    /* for training...2e */
    
    const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
        const ctx = canvas.getContext("2d");

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);

        //console.log(pose["keypoints"])

        /* 각도 재서 카운트 하는거만 js
            js 잘못됬다는 것만
    */
        // ml5 classification

        // temp classifying s
        if (mode == 'classify') {
            switch(classifiedPose) {
                case 'noHand':
                    console.log('손 없음');
                    break;
                case 'oneHand':
                    console.log('손 하나');
                    break;
                case 'twoHand':
                    console.log('손 두개');
                    break;
                default:
                    console.log('알수 없음');
                    break;
            }
        }
        // temp classifying e

        /* for classifying...5s */
        if (mode == 'classify') {
            // switch (classifiedPose) {
            // case 'standUp':
            //     console.log('서있는 자세');
            //     break;
            // case 'perfect':
            //     console.log('완벽합니다!');
            //     break;
            // case 'waistDown':
            //     console.log('허리를 세워주세요');
            //     break;
            // case 'legUp':
            //     console.log('더 앉아주세요');
            //     break;
            // default:
            //     console.log('알 수 없는 자세');
            //     break;
            // }
        }
        /* for classifying...5e */
        drawKeypoints(pose["keypoints"], 0.6, ctx);
        drawSkeleton(pose["keypoints"], 0.7, ctx);
    };

    // v : save, r : training
    // n, o, t : temp data collecting
    // s, c, w, l : data collecting
    const handleKeyPress = async e => {
        console.log(e.key);
        if (e.key == 'v') {
            if (mode == 'data') {
                brain.saveData(dataFileName);
            }
        } else if (e.key == 'd') {
            if (mode == 'train') {
                brain.loadData(dataFilePath);
            }
        } else if (e.key == 'r') {
            if (mode == 'train') {
                let inputNames = [
                    'nose_X', 'nose_Y',
                    'left_eye_X', 'left_eye_Y',
                    'right_eye_X', 'right_eye_Y',
                    'left_ear_X', 'left_ear_Y',
                    'right_ear_X', 'right_ear_Y',
                    'left_shoulder_X', 'left_shoulder_Y',
                    'right_shoulder_X', 'right_shoulder_Y',
                    'left_elbow_X', 'left_elbow_Y',
                    'right_elbow_X', 'right_elbow_Y',
                    'left_wrist_X', 'left_wrist_Y',
                    'right_wrist_X', 'right_wrist_Y'
                ];
                brain.trainModel(trainEpochs, inputNames, modelTrained);
            }
        } else if (e.key == 'n') {
            if (mode == 'data') {
                targetPose = 'noHand'
                console.log('ready for collect NO HAND pose');

                setTimeout(function() {
                    console.log('collecting');
                    state = 'collecting';

                    setTimeout(function() {
                        console.log('not collecting');
                        state = 'waiting';
                    }, 5000);
                }, 5000);
            }
        } else if (e.key == 'o') {
            if (mode == 'data') {
                targetPose = 'oneHand'
                console.log('ready for collect ONE HAND pose');

                setTimeout(function() {
                    console.log('collecting');
                    state = 'collecting';

                    setTimeout(function() {
                        console.log('not collecting');
                        state = 'waiting';
                    }, 5000);
                }, 5000);
            }
        } else if (e.key == 't') {
            if (mode == 'data') {
                targetPose = 'twoHand'
                console.log('ready for collect TWO HAND pose');

                setTimeout(function() {
                    console.log('collecting');
                    state = 'collecting';

                    setTimeout(function() {
                        console.log('not collecting');
                        state = 'waiting';
                    }, 5000);
                }, 5000);
            }
        } else if (e.key == 's') {
            targetPose = 'standUp';
            console.log('ready for collect STAND UP pose');

            setTimeout(function() {
                console.log('collecting');
                state = 'collecting';

                setTimeout(function() {
                    console.log('not collecting');
                    state = 'waiting';
                }, 10000);
            }, 10000);
        } else if (e.key == 'c') {
            targetPose = 'perfect';
            console.log('ready for collect PERFECT pose');

            setTimeout(function() {
                console.log('collecting');
                state = 'collecting';

                setTimeout(function() {
                    console.log('not collecting');
                    state = 'waiting';
                }, 5000);
            }, 10000);
        } else if  (e.key == 'w') {
            targetPose = 'waistDown';
            console.log('ready for colelct WAIST DOWN pose');

            setTimeout(function() {
                console.log('collecting');
                state = 'collecting';

                setTimeout(function() {
                    console.log('not collecting');
                    state = 'waiting';
                }, 5000);
            }, 10000);
        } else if (e.key == 'l') {
            targetPose = 'legUp';
            console.log('ready for collect LEG UP pose');

            setTimeout(function() {
                console.log('collecting');
                state = 'collecting';

                setTimeout(function() {
                    console.log('not collecting');
                    state = 'waiting';
                }, 5000);
            }, 10000);
        }
    }

    runMovenet();
    return (
        <div className="App">
            <header className="App-header">
            <Webcam
                ref={webcamRef}
                mirrored
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480,
                }}
            />
  
            <canvas
                ref={canvasRef}
                style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
                }}
            />

            <button type="button"
                onKeyPress={handleKeyPress}>
            train
            </button>
            </header>
        </div>
    );
}
    

export default CheckPwPage;