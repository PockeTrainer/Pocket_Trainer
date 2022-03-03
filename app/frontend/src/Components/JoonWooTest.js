import React, { Component, useRef,useEffect,useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "../../utilities.js";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { pushup_count } from '../../../modules/action.js';
import { situp_count } from '../../../modules/action.js';
import { squat_count } from '../../../modules/action.js';
import { testState } from '../../../modules/action.js';
import {none_testState} from '../../../modules/action.js';

import * as tmPose from '@teachablemachine/pose';






function Camera({display,page}) {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const exercise_name=useParams();

    const count=useRef(0);//딱 처음에만 테스트 들어간 상황을 디스패치해주기위해서

    const dispatch=useDispatch();


    var fordingState = "unfolding";

    let [result, changeResult] = useState();

    const URL = "https://teachablemachine.withgoogle.com/models/0jKMa6UG7/";
    let model, webcam, ctx, labelContainer, maxPredictions;
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    //const modelURL = "https://smlistener.s3.ap-northeast-2.amazonaws.com/model_0307/lr_0.02_epoch50_2/model.json";
    //const metadataURL = "https://smlistener.s3.ap-northeast-2.amazonaws.com/model_0307/lr_0.02_epoch50_2/model_meta.json";
   // const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const runMovenet = async () => {
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

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

            //const poses = await detector.estimatePoses(video);
            const { pose, posenetOutput } = await model.estimatePose(video);
            if (pose != 0) {          
                const prediction = await model.predict(posenetOutput);
                //console.log(prediction)
                for (let i = 0; i < maxPredictions; i++) {
                    const classPrediction =
                        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                    //console.log(classPrediction)
                    changeResult(classPrediction)
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



    useEffect(()=>{
        runMovenet();//디스패치를 시키면 상태변화때문에 부모 컴포넌트에서 리랜더링되면 카메라도 리랜더링 될것이라서 그때마다 setInterval시키면 계속쌓임 따라서 한번만 실행
        dispatch(testState(page));
    },[])

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
                        objectFit:"fill",
                        display:display==="no"?"none":"flex"
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
              objectFit:"fill",
              display:display==="no"?"none":"flex"
            }}
            
          />
          <h1 style={{
              zIndex:99999,
              position:"relative",
              bottom:"3em"
          }}>{result}</h1>
      </div>
    );
}
        
export default Camera