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
// import '@tensorflow/tfjs-backend-wasm';

function CheckPwPage() {
     const webcamRef = useRef(null);
     const canvasRef = useRef(null);

    const brain = ''

    function brainLoaded() {
        console.log('Loaded')
    }

    // const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const runMovenet = async () => {
        const options = {
            inputs: 34,
            outputs: 2,
            task: 'classification',
            debug: true
        };
        brain = ml5.neuralNetwork(options);  //ml5 neuralNetwork 시작
        const modelInfo = {
            model:"https://smlistener.s3.ap-northeast-2.amazonaws.com/model_0307/lr_0.02_epoch50_2/model.json",
            metadata : "https://smlistener.s3.ap-northeast-2.amazonaws.com/model_0307/lr_0.02_epoch50_2/model_meta.json",
            weights: "https://smlistener.s3.ap-northeast-2.amazonaws.com/model_0307/lr_0.02_epoch50_2/model.weights.bin"
          };  //model load
        brain.load(modelInfo, brainLoaded);

        const detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet, 
            // detectorConfig,
        )
        setInterval(() => {
            detect(detector);
          }, 100);
    }

    function gotResult(error, results) {
        console.log(results)
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

            brain.classify(poses[0], gotResult);
            // Start image classification

            if (poses.length > 0) { 
                drawCanvas(poses[0], video, videoWidth, videoHeight, canvasRef.current);
            }
        }
    }

    const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
        const ctx = canvas.getContext("2d");

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);

        console.log(pose["keypoints"])

        /* 각도 재서 카운트 하는거만 js
            js 잘못됬다는 것만
        */

        drawKeypoints(pose["keypoints"], 0.6, ctx);
        drawSkeleton(pose["keypoints"], 0.7, ctx);
      };

    //runMovenet();
    //detect();
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
        
    // <div className="CheckPwPage">
    //     <div className="GNB">회원정보를 수정하기 위해 <br/>비밀번호를 입력 해주시기 바랍니다</div>
        
    //     <div className="mainsource">
    //         <label htmlFor="pw">비밀번호</label>
    //         <input type="password" name="pw" id="pw" />

    //         <Link to="/MyPage/UpdatePage"><button id="submitBTN">확인</button></Link>
    //     </div>
    // </div>

export default CheckPwPage;