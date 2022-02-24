import React, { Component, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../css/MyPage/CheckPwPage.css';
//import * as tf from '@tensorflow/tfjs-core';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl';
// Register one of the TF.js backends.
import * as ml5 from "ml5";
//import '@tensorflow/tfjs-backend-webgl';
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
// import '@tensorflow/tfjs-backend-wasm';

function CheckPwPage() {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    let classifiedPose;
    let ml5Poses;
    let brain;

    // const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const runMovenet = async () => {
        const options = {
            task: 'classification',
            debug: true
        };
        brain = ml5.neuralNetwork(options);  //ml5 neuralNetwork 시작
        const modelInfo = {
            model: "https://pocket-trainer.s3.ap-northeast-2.amazonaws.com/model/model.json",
            metadata: "https://pocket-trainer.s3.ap-northeast-2.amazonaws.com/model/model_meta.json",
            weights: "https://pocket-trainer.s3.ap-northeast-2.amazonaws.com/model/model.weights.bin",
        };
        console.log(brain)
        brain.load(modelInfo, brainLoaded);
        console.log(brain);
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
                classifyPose(poses[0]);
                drawCanvas(poses[0], video, videoWidth, videoHeight, canvasRef.current);
            }
        }
    }

    const brainLoaded = async () => {
        console.log('Loaded')
        const detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet, 
            // detectorConfig,
        )
        setInterval(() => {
            detect(detector);
        }, 100);
        //console.log(ml5Poses)
       // if (ml5Poses.length > 0) {
            //classifyPose(ml5Poses[0]);
        //}
    }

    const classifyPose = (pose) => {
        if (pose) {
            let inputs = [];

            for (let i = 0; i < 11; i++) {
                let x = pose['keypoints'][i].x;
                let y = pose['keypoints'][i].y;
                inputs.push(x);
                inputs.push(y);
            }
            //console.log(inputs)
            console.log(brain)
            brain.classify(inputs, gotResult);
        }
    }

    const gotResult = (error, results) => {
        if (error) {
            console.log('error', error)
        } else {
            console.log('gotResult start');
            console.log('result : ', results);
        }     
        //console.log('result : ', results)
        // if (results[0].confidence > 0.75) {
        //     classifiedPose = results[0].label;
        //     console.log(results)
        // }
        //classifyPose(pose);
    }
    
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
        switch (classifiedPose) {
        case 'standUp':
            console.log('서있는 자세');
            break;
        case 'perfect':
            console.log('완벽합니다!');
            break;
        case 'waistDown':
            console.log('허리를 세워주세요');
            break;
        case 'legUp':
            console.log('더 앉아주세요');
            break;
        default:
            console.log('알 수 없는 자세');
            break;
        }
        drawKeypoints(pose["keypoints"], 0.6, ctx);
        drawSkeleton(pose["keypoints"], 0.7, ctx);
    };

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
            </header>
        </div>
    );
}
    

export default CheckPwPage;