import React, { Component, useRef,useEffect } from 'react';
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
import {setting_completed} from '../../../modules/action.js';






//세 점 사이의 각도 구하기
function jointAngle(p1x, p1y, p2x, p2y, p3x, p3y) {
    if(p1x == undefined || p1y == undefined || p2x == undefined || p2y == undefined || p3x == undefined || p3y == undefined) {
        return undefined;
    }

    else {
        var deg = 0;
        
        var rad1 = Math.atan2(p1y - p2y, p1x - p2x);
        var deg1 = (360 + (rad1 * 180) / Math.PI) % 360;

        var rad2 = Math.atan2(p3y - p2y, p3x - p2x);
        var deg2 = (360 + (rad2 * 180) / Math.PI) % 360;

        if(deg1 <= deg2) {
            deg = deg2 - deg1;
        }
        else {
            deg = 360 - (deg1 - deg2);
        }

        if(deg > 180) {
            deg = 360 - deg;
        }

        return deg;
    }
}

function Camera({display}) {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const exercise_name=useParams();

    const count=useRef(0);//딱 처음에만 테스트 들어간 상황을 디스패치해주기위해서

    const dispatch=useDispatch();


    var fordingState = "unfolding";

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
            //console.log(poses)
            //카메라가 가동되기 시작함-이때부터 점도 찍을수 있게 됨
            if (poses.length > 0) { 
                drawCanvas(poses[0], video, videoWidth, videoHeight, canvasRef.current);
                console.log("디텍트 중");
                if(count.current==0){
                    count.current+=1;
                    dispatch(setting_completed());//카메라 완료상태를 의미
                }

            }
        }
    }

    const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
        const ctx = canvas.getContext("2d");

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);

        if(exercise_name.exercise_name === "pushup"||exercise_name.exercise_name === "dumbbell_shoulder_press"||exercise_name.exercise_name === "side_lateral_raise"||exercise_name.exercise_name === "reverse_peck_deck_fly"||exercise_name.exercise_name === "squat"||exercise_name.exercise_name === "leg_press"||exercise_name.exercise_name === "squat"||exercise_name.exercise_name === "leg_extension"||exercise_name.exercise_name === "plank") {
            var leftArmAngle = jointAngle(pose["keypoints"][5].x, pose["keypoints"][5].y, pose["keypoints"][7].x, pose["keypoints"][7].y, pose["keypoints"][9].x, pose["keypoints"][9].y);
            var rightArmAngle = jointAngle(pose["keypoints"][6].x, pose["keypoints"][6].y, pose["keypoints"][8].x, pose["keypoints"][8].y, pose["keypoints"][10].x, pose["keypoints"][10].y);

            if(pose["keypoints"].length != 0) {
                if(leftArmAngle < 90 && rightArmAngle < 90) {
                    if(fordingState == "unfolding") {
                        fordingState = "folding"
                    }
                }
            }
            if(leftArmAngle > 170 && rightArmAngle > 170 && fordingState == "folding") {
                fordingState = "unfolding";;
                dispatch(pushup_count());//리덕스에 값을 업데이트 디스패치 시킴
            }

            
        }

        else if(exercise_name.exercise_name == "situp") {
            var leftHipAngle = jointAngle(pose["keypoints"][5].x, pose["keypoints"][5].y, pose["keypoints"][11].x, pose["keypoints"][11].y, pose["keypoints"][13].x, pose["keypoints"][13].y);
            var rightHipAngle = jointAngle(pose["keypoints"][6].x, pose["keypoints"][6].y, pose["keypoints"][12].x, pose["keypoints"][12].y, pose["keypoints"][14].x, pose["keypoints"][14].y);
            
            if(pose["keypoints"].length != 0) {
                if(leftHipAngle < 50 && rightHipAngle < 50) {
                    if(fordingState == "unfolding") {
                        fordingState = "folding"
                    }
                }
            }
            if(leftArmAngle > 120 && rightArmAngle > 120 && fordingState == "folding") {
                fordingState = "unfolding";
                dispatch(situp_count());//리덕스에 값을 업데이트 디스패치 시킴

            }


        }

        else if(exercise_name.exercise_name == "squat") {
            var leftLegAngle = jointAngle(pose["keypoints"][11].x, pose["keypoints"][11].y, pose["keypoints"][13].x, pose["keypoints"][13].y, pose["keypoints"][15].x, pose["keypoints"][15].y);
            var rightLegAngle = jointAngle(pose["keypoints"][12].x, pose["keypoints"][12].y, pose["keypoints"][14].x, pose["keypoints"][14].y, pose["keypoints"][16].x, pose["keypoints"][16].y);
        
            if(pose["keypoints"].length != 0) {
                if(leftLegAngle < 90 && rightLegAngle < 90) {
                    if(fordingState == "unfolding") {
                        fordingState = "folding"
                    }
                }
            }
            if(leftArmAngle > 170 && rightArmAngle > 170 && fordingState == "folding") {
                fordingState = "unfolding";
                dispatch(squat_count());//리덕스에 값을 업데이트 디스패치 시킴
            }


        }

        drawKeypoints(pose["keypoints"], 0.6, ctx);
        drawSkeleton(pose["keypoints"], 0.7, ctx);
      };


    useEffect(()=>{
        runMovenet();//디스패치를 시키면 상태변화때문에 부모 컴포넌트에서 리랜더링되면 카메라도 리랜더링 될것이라서 그때마다 setInterval시키면 계속쌓임 따라서 한번만 실행
    
    },[])

    //detect();
    return (
        <div>
                <Webcam
                    mirrored={true}
                    ref={webcamRef}
                    style={{
                        position:"absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: "100%",
                        height: "80vh",
                        top:"0em",
                        objectFit:"fill",
                        visibility:display==="no"?"hidden":"visible",
                    }}
                />
  
                    {/* 테스트 상황과 루틴페이지에서의 상황이 상이하여 포지션을 나눔 */}
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
              height: "80vh",
              top:"0em",
              objectFit:"fill",
              visibility:display==="no"?"hidden":"visible",
            }}
          />
      </div>
    );
}
        
export default Camera