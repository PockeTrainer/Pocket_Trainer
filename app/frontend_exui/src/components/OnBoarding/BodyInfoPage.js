import React, { Component, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../css/OnBoarding/BodyInfoPage.css';
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";

function BodyInfoPage() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
  
    //  Load posenet
    const runPosenet = async () => {
      const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.8,
      });
      //
      setInterval(() => {
        detect(net);
      }, 100);
    };
  
    const detect = async (net) => {
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
  
        // Make Detections
        const pose = await net.estimateSinglePose(video);
        console.log(pose);
  
        drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
      }
    };
  
    const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
      const ctx = canvas.current.getContext("2d");
      canvas.current.width = videoWidth;
      canvas.current.height = videoHeight;
  
      drawKeypoints(pose["keypoints"], 0.6, ctx);
      //drawSkeleton(pose["keypoints"], 0.7, ctx);
    };
  
    runPosenet();
  
    return (
      <div className="App">
        <header className="App-header">
          <Webcam
            ref={webcamRef}
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
    /*
    render() {
        
    return (
    /*
    <div className="BodyInfoPage">
        <div className="GNB">신체 정보를 입력해 주세요</div>
        <div className="mainsource">
            <label htmlFor="height">신장(cm)</label>
            <input type="text" name="height" id="height" />
                    
            <label htmlFor="weight">체중(kg)</label>
            <input type="text" name="weight" id="weight" />

            <label htmlFor="bmi">BMI</label>
            <input type="text" name="bmi" id="bmi" readOnly='true'/>

            <Link to="/OnBoarding/ScanPage"><button id="nextBTN">다음</button></Link>
        </div>
    </div>
      };
}
    */

export default BodyInfoPage;