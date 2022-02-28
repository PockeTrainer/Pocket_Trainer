import React, { Component, useRef, useState } from 'react';
import humanIcon from '../../icons/human.png'
import '../../css/OnBoarding/ResultPage.css';
import * as tmPose from '@teachablemachine/pose';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from "react-webcam";
import { useParams } from "react-router-dom";

import { drawKeypoints, drawSkeleton } from "./utilities";

function ResultPage() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    let [result, changeResult] = useState(false);

    const URL = "https://teachablemachine.withgoogle.com/models/BkXwXG3R4/";
    let model, webcam, ctx, labelContainer, maxPredictions;
    //const modelURL = URL + "model.json";
    //const metadataURL = URL + "metadata.json";
    const modelURL = "https://pocket-trainer.s3.ap-northeast-2.amazonaws.com/tm/model.json";
    const metadataURL = "https://pocket-trainer.s3.ap-northeast-2.amazonaws.com/tm/metadata.json";
   // const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const runMovenet = async () => {
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        setInterval(() => {
            detect();
        }, 100);
    }


   const detect = async () => {
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

            //const poses = await detector.estimatePoses(video);
            const { pose, posenetOutput } = await model.estimatePose(video);
            if (pose != null) {          
                const prediction = await model.predict(posenetOutput);
                //console.log(prediction)
                for (let i = 0; i < maxPredictions; i++) {
                    const classPrediction =
                        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                    if(prediction[i].probability.toFixed(2) > 0.75) {
                        changeResult(classPrediction)
                        //console.log(classPrediction)
                    }
                    //changeResult(classPrediction)
                    //drawCanvas(pose, video, videoWidth, videoHeight, canvasRef.current);
                }
                drawCanvas(pose, video, videoWidth, videoHeight, canvasRef.current);
            }
        }
    }


    const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
        const ctx = canvas.getContext("2d");

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);

        //console.log(pose)

       /* 각도 재서 카운트 하는거만 js
           js 잘못됬다는 것만
       */
        tmPose.drawKeypoints(pose.keypoints, 0.6, ctx);
        tmPose.drawSkeleton(pose.keypoints, 0.7, ctx);
    //    drawKeypoints(pose["keypoints"], 0.6, ctx);
    //    drawSkeleton(pose["keypoints"], 0.7, ctx);
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

            <label htmlFor="" style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480
            }}>{result}</label>
        </header>
    </div>
    ) ;
}

export default ResultPage;