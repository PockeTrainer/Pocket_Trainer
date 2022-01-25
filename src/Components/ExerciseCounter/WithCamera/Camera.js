import React, { Component, useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "../../utilities.js";

function Camera() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    // const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const runMovenet = async () => {
        const detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet, 
            // detectorConfig,
        )
        setInterval(() => {
            detect(detector);
          }, 100);
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
            console.log(poses)
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

        //console.log(pose["keypoints"])

        /* 각도 재서 카운트 하는거만 js
            js 잘못됬다는 것만
        */

        drawKeypoints(pose["keypoints"], 0.6, ctx);
        drawSkeleton(pose["keypoints"], 0.7, ctx);
      };

    runMovenet();

    //detect();
    return (
        <div>
                <Webcam
                    mirrored={true}
                    ref={webcamRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: "100%",
                        height: "33em",
                        top:"0em",
                        objectFit:"fill"
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
              width: "100%",
              height: "33em",
              top:"0em",
              objectFit:"fill"
            }}
          />
      </div>
    );
}
        
export default Camera