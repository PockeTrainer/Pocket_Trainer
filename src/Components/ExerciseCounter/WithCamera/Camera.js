import React, { Component, useRef,useEffect } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities.js";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { pushup_count, send_posture_of_exercise } from '../../../modules/action.js';
import { situp_count } from '../../../modules/action.js';
import { squat_count } from '../../../modules/action.js';
import { testState } from '../../../modules/action.js';
import {none_testState} from '../../../modules/action.js';
import {setting_completed,send_angle} from '../../../modules/action.js';

import * as cm from './ClassificationModel';

// 외부에 전달될 변수들
// anglePercentage : 현재 운동의 게이지 퍼센트(실수형. 0~100)
let anglePercentage = null;

// classifiedPose : 현재 운동의 자세('correctUp' 등. 분류가 안 되는 자세는 'none')
let classifiedPose = null;

// exerciseName : 현재의 운동명('BenchPress' 등)
// -> exerciseName이 변경되면 modelName, modelPath에 반영됨.
let exerciseName;

switch(exerciseName) {
    case 'SideLateralRaise':
        var videoPaths = {
            path0: `${process.env.PUBLIC_URL}/videos/SideLateralRaise/test_h264.mp4`,
            path1: `${process.env.PUBLIC_URL}/videos/SideLateralRaise/test2_h264.mp4`,
            path2: `${process.env.PUBLIC_URL}/videos/SideLateralRaise/test3_h264.mp4`,
            path3: `${process.env.PUBLIC_URL}/videos/SideLateralRaise/test4_h264.mp4`,
        }
        break;
    case 'BenchPress':
        var videoPaths = {
            path0: `${process.env.PUBLIC_URL}/videos/BenchPress/test_h264.mp4`,
            path1: `${process.env.PUBLIC_URL}/videos/BenchPress/test2_h264.mp4`,
            path2: `${process.env.PUBLIC_URL}/videos/BenchPress/test3_h264.mp4`,
            path3: `${process.env.PUBLIC_URL}/videos/BenchPress/test4_h264.mp4`,
        }
        break;
    case 'SeatedKneeUp':
        var videoPaths = {
            path0: `${process.env.PUBLIC_URL}/videos/SeatedKneeUp/test_h264.mp4`,
            path1: `${process.env.PUBLIC_URL}/videos/SeatedKneeUp/test2_h264.mp4`,
            path2: `${process.env.PUBLIC_URL}/videos/SeatedKneeUp/test3_h264.mp4`,
            path3: `${process.env.PUBLIC_URL}/videos/SeatedKneeUp/test4_h264.mp4`,
        }
        break;
    default:
        var videoPaths = {
            path0: `${process.env.PUBLIC_URL}/videos/SeatedKneeUp/test_h264.mp4`,
        }
        break;
}

function Camera({display}) {
    // React Settings
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const exercise_name = useParams();

    // 테스트 비디오 사용 세팅
    const videoRef = useRef(null);
    const videoPathNum = 0;
    let movenetLoaded = false;

    // 오디오 중복 방지
    let audioLock = false;

    const dispatch = useDispatch();

    // 모델 관련
    let brain = null;
    let currentModel = null;
    let detectedPose;

    let loadedModel = null;

    // snake_case로 넘어온 url 운동명을 PaskalCase로 변경
    if (exercise_name.exercise_name == 'squat') {
        exerciseName = 'LightSquat';
    } else if (exercise_name.exercise_name == 'pushup') {
        exerciseName = 'PushUp';
    } else if (exercise_name.exercise_name == 'situp') {
        exerciseName = 'SitUp';
    } else if (exercise_name.exercise_name == 'pec_dec_fly') {
        exerciseName = 'PeckDeckFly';
    } else if (exercise_name.exercise_name == 'reverse_pec_dec_fly') {
        exerciseName = 'ReversePecDeckFly';
    } else {
        exerciseName = snake2Pascal(exercise_name.exercise_name);
    }

    // 모델 입력 및 출력 크기
    // 운동에 따라 출력 크기 변경
    let modelInputSize = 34;
    let modelOutputSize;
    switch(exerciseName) {
        case 'BenchPress':
            modelOutputSize = 5;
            break;
        case 'SeatedKneeUp':
        case 'Squat':
        case 'LightSquat':
        case 'BenchPress':
        case 'LyingTricepsExtension':
        case 'SideLateralRaise':
        case 'SitUp':
            modelOutputSize = 4;
            break;
        default:
            modelOutputSize = 3;
    }

    // modelName : 학습 후 저장될 데이터 파일, 가중치 파일 이름. 
    //             저장 후 변경 시 에러 발생하니 여기서 지정한 후 저장할 것.
    // modelUrl : 불러올 학습된 모델의 url. 웹 상에 올라가야 함. (지금은 github repository에 올려둠.)
    let modelName = exerciseName + 'Model';
    let modelUrl = 'https://raw.githubusercontent.com/Chominsu98/Pocket_Trainer_Server/main/Model/' + exerciseName + '/' + modelName + '.json';

    // 운동 수행 갯수
    const count = useRef(0);//딱 처음에만 테스트 들어간 상황을 디스패치해주기위해서
    //let count = 0;
    let countStack = [];
    let countState = false;

    // 여러가지 함수 부분

    // Movenet 관련
    // detectorConfig : *.SINGLEPOSE_LIGHTNING / *.SINGLEPOSE_THUNDER 중 선택
    //                  LIGHTNING : 가볍고 성능 약간 낮음
    //                  THUNDER : 약간 무겁고 성능 높음
    const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const runMovenet = async () => {
        console.log("여기기기?");
        // InputSize, OutputSize에 맞는 모델 생성
        if (brain == null) {
            brain = new cm.ClassificationModel(modelInputSize, modelOutputSize);
        }

        brain.loadModel(modelUrl, async model => {
            console.log('model loaded');
            currentModel = model;
            loadedModel = model;
        });

        const detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet, 
            detectorConfig,
        )
        // timeId.current =
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
            //카메라가 가동되기 시작함-이때부터 점도 찍을수 있게 됨
            if (poses.length > 0) { 
                if(count.current==0){
                    count.current+=1;
                    dispatch(setting_completed());//카메라 완료상태를 의미
                }

                detectedPose = poses[0];

                classifyPose();
                let angle=await setAnglePercentage();
                //각도보낼거임
                // console.log(angle)
                dispatch(send_angle(angle));
                
                countExercise();

                drawCanvas(poses[0], video, videoWidth, videoHeight, canvasRef.current);
            }
        }

    //     if (
    //         typeof videoRef.current !== "undefined" &&
    //         videoRef.current !== null &&
    //         videoRef.current.readyState == 4
    //     ) {
    //         // Get Video Properties
    //         const video = videoRef.current;
                
    //         // const videoWidth = videoRef.current.videoWidth;
    //         // const videoHeight = videoRef.current.videoHeight;
    //         const videoWidth = 640;
    //         const videoHeight = 480;

    //         videoRef.current.width = videoWidth;
    //         videoRef.current.height = videoHeight;

    //         if (!movenetLoaded) {
    //             console.log('movenet now loading...');
    //         }
    //         const poses = await detector.estimatePoses(video);
    //         if (!movenetLoaded) {
    //             console.log('load movenet complete');
    //             movenetLoaded = true;
    //             dispatch(setting_completed())
    //         }

    //         videoRef.current.play();

    //         if (poses.length > 0) {
    //             detectedPose = poses[0];
    //             // for classifying...3s
    //             classifyPose();
    //             setAnglePercentage();
    //             // 각도 보낼거임
    //             //anglePercentage;
    //             countExercise();
    //         }

    //         drawCanvas(poses[0], video, videoWidth, videoHeight, canvasRef.current);

    //         if(count.current == 10) {
    //             loadedModel = null;
    //             count.current = 0;
                
    //             setInterval(() => {
    //                 loadedModel = currentModel;
    //               }, 3000);
    //         }
    //     }
    }

    const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
        const ctx = canvas.getContext("2d");

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        
        // let xScale = 640 / videoRef.current.videoWidth;
        // let yScale = 480 / videoRef.current.videoHeight;
        // let xScale = 640 / webcamRef.current.video.videoWidth;
        // let yScale = 480 / webcamRef.current.video.videoHeight;
        let xScale = 1;
        let yScale = 1;

        console.log('운동명: ', exerciseName);
        console.log(classifiedPose + ", "+ count.current + "개, [" + countStack + "]");

        // 운동 별 다른 하이라이트를 위해 exerciseName을 매개변수로 넘겨줌
        drawKeypoints(pose["keypoints"], exerciseName, 0.3, ctx, xScale, yScale); //0.6
        drawSkeleton(pose["keypoints"], exerciseName, 0.4, ctx, xScale, yScale); // 0.7
    };

    // 자세 분류 함수
    const classifyPose = async () => {
        if(detectedPose) {
            let rowObj = {};

            for (let i = 0; i < detectedPose['keypoints'].length; i++) {
                let nameX = detectedPose['keypoints'][i]['name'] + '_X';
                let nameY = detectedPose['keypoints'][i]['name'] + '_Y';
                let x = detectedPose['keypoints'][i]['x'];
                let y = detectedPose['keypoints'][i]['y'];
                
                // let videoWidth = videoRef.current.videoWidth;
                // let videoHeight = videoRef.current.videoHeight;
                let videoWidth = webcamRef.current.video.videoWidth;
                let videoHeight = webcamRef.current.video.videoHeight;

                let ratioX = x / videoWidth;
                let ratioY = y / videoHeight;

                rowObj[nameX] = ratioX;
                rowObj[nameY] = ratioY;
            }

            brain.classify(rowObj, loadedModel, gotResult);
        }
    }

    // brain.classify 콜백
    // 분류된 자세를 classifiedPose에 등록
    const gotResult = async (results) => {
        let resultArray = results.arraySync();

        var idx = resultArray[0].findIndex((element, index, array) => {
            if (element == Math.max(...array)) {
                return true;
            }
        });

        // 분류된 자세를 classifiedPose에 등록
        // 맨몸 운동들
        if (exerciseName == 'PushUp') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessDown';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'SitUp') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctUp';
                    break;
                case 1:
                    classifiedPose = 'correctDown';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                case 3:
                    classifiedPose = 'tooDown';
                    var audio = new Audio('/audios/leg_too_open.mp3');
                    dispatch(send_posture_of_exercise("다리를 좁혀주세요"));
                    audioPlay(audio);
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'LightSquat') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessDown';
                    break;
                case 3:
                    classifiedPose = 'tooBend';
                    var audio = new Audio('/audios/waist_too_bent.mp3');
                    dispatch(send_posture_of_exercise("허리를 펴주세요"));
                    audioPlay(audio);
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        // 맨몸 운동 외 21개 운동들
        } else if (exerciseName == 'BenchPress') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                case 3:
                    classifiedPose = 'leanToLeft';
                    var audio = new Audio('/audios/benchpress_left_up.mp3');
                    dispatch(send_posture_of_exercise("왼쪽 팔을 더 올려 주세요"));
                    audioPlay(audio);
                    break;
                case 4:
                    classifiedPose = 'leanToRight';
                    var audio = new Audio('/audios/benchpress_right_up.mp3');
                    dispatch(send_posture_of_exercise("오른쪽 팔을 더 올려 주세요"));
                    audioPlay(audio);
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'InclinePress') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'SideLateralRaise') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctUp';
                    break;
                case 1:
                    classifiedPose = 'correctDown';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                case 3:
                    classifiedPose = 'tooUp';
                    var audio = new Audio('/audios/arm_up_to_up.mp3');
                    dispatch(send_posture_of_exercise("팔을 더 내려주세요"));
                    audioPlay(audio);
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'SeatedKneeUp') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'tooBack';
                    var audio = new Audio('/audios/upperbody_down_to_down.mp3');
                    dispatch(send_posture_of_exercise("상체를 더 올려주세요"));
                    audioPlay(audio);
                    break;
                case 3:
                    classifiedPose = 'tooDown';
                    var audio = new Audio('/audios/leg_too_down.mp3');
                    dispatch(send_posture_of_exercise("다리를 더 올려주세요"));
                    audioPlay(audio);
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'Squat') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessDown';
                    break;
                case 3:
                    classifiedPose = 'tooBend';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'CablePushDown') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctUp';
                    break;
                case 1:
                    classifiedPose = 'correctDown';
                    break;
                case 2:
                    classifiedPose = 'lessDown';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'Plank') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correct';
                    break;
                case 1:
                    classifiedPose = 'tooDown';
                    break;
                case 2:
                    classifiedPose = 'tooUp';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'LyingTricepsExtension') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                case 3:
                    classifiedPose = 'tooDown';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'LegExtension') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'ArmCurl') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'BarbellRow') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                case 3:
                    classifiedPose = 'tooUp';
                    break; 
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'Crunch') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'tooDown';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'DumbbellKickBack') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                case 3:
                    classifiedPose = 'tooUp';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'EasybarCurl') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'HammerCurl') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'LatPullDown') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessDown';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'LegPress') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'PecDeckFly') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'ReversePecDeckFly') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'SeatedRow') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                case 3:
                    classifiedPose = 'tooBend';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        } else if (exerciseName == 'ShoulderPress') {
            switch(idx) {
                case 0:
                    classifiedPose = 'correctDown';
                    break;
                case 1:
                    classifiedPose = 'correctUp';
                    break;
                case 2:
                    classifiedPose = 'lessUp';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        }
    }

    // 운동의 퍼센트 반환
    const setAnglePercentage = async () => {
        switch(exerciseName) {
            // 맨몸 운동들
            case 'PushUp':
                anglePercentage = getAnglePercentage(
                    180, 
                    90, 
                    detectedPose['keypoints'][6], 
                    detectedPose['keypoints'][8], 
                    detectedPose['keypoints'][10]
                );
                break;
            case 'SitUp':
                anglePercentage = getAnglePercentage(
                    130,
                    45,
                    detectedPose['keypoints'][5], 
                    detectedPose['keypoints'][11], 
                    detectedPose['keypoints'][13]
                );
                break;
            case 'LightSquat':
                anglePercentage = getAnglePercentage(
                    180, 
                    90, 
                    detectedPose['keypoints'][11], 
                    detectedPose['keypoints'][13], 
                    detectedPose['keypoints'][15]
                );
                break;
            // 맨몸 외 21개 운동
            case 'BenchPress':
                anglePercentage = getAnglePercentage(
                    45, 
                    125, 
                    detectedPose['keypoints'][6], 
                    detectedPose['keypoints'][8], 
                    detectedPose['keypoints'][10]
                );
                break;
            case 'Squat':
                anglePercentage = getAnglePercentage(
                    180, 
                    90, 
                    detectedPose['keypoints'][11], 
                    detectedPose['keypoints'][13], 
                    detectedPose['keypoints'][15]
                );
                break;
            case 'SideLateralRaise':
                anglePercentage = getAnglePercentage(
                    20, 
                    90, 
                    detectedPose['keypoints'][8], 
                    detectedPose['keypoints'][6], 
                    detectedPose['keypoints'][12]
                );
                break;
            case 'CablePushDown':
                anglePercentage = getAnglePercentage(
                    90, 
                    170, 
                    detectedPose['keypoints'][6], 
                    detectedPose['keypoints'][8], 
                    detectedPose['keypoints'][10]
                );
                break;
            case 'Plank':
                break;
            case 'SeatedKneeUp':
                anglePercentage = getAnglePercentage(
                    80, 
                    45, 
                    detectedPose['keypoints'][5], 
                    detectedPose['keypoints'][11], 
                    detectedPose['keypoints'][13]
                );
                break;
            case 'LyingTricepsExtension':
                anglePercentage = getAnglePercentage(
                    100, 
                    150, 
                    detectedPose['keypoints'][6], 
                    detectedPose['keypoints'][8], 
                    detectedPose['keypoints'][10]
                );
                break;
            case 'LegExtension':
                anglePercentage = getAnglePercentage(
                    90, 
                    160, 
                    detectedPose['keypoints'][12], 
                    detectedPose['keypoints'][14], 
                    detectedPose['keypoints'][16]
                );
                break;
            case 'ArmCurl':
                anglePercentage = getAnglePercentage(
                    135, 
                    45, 
                    detectedPose['keypoints'][5], 
                    detectedPose['keypoints'][7], 
                    detectedPose['keypoints'][9]
                );
                break;
            case 'BarbellRow':
                anglePercentage = getAnglePercentage(
                    160, 
                    90, 
                    detectedPose['keypoints'][5], 
                    detectedPose['keypoints'][7], 
                    detectedPose['keypoints'][9]
                );
                break;
            case 'Crunch':
                anglePercentage = getAnglePercentage(
                    120, 
                    100, 
                    detectedPose['keypoints'][6], 
                    detectedPose['keypoints'][12], 
                    detectedPose['keypoints'][14]
                );
                break;
            case 'DumbbellKickBack':
                anglePercentage = getAnglePercentage(
                    100, 
                    170, 
                    detectedPose['keypoints'][5], 
                    detectedPose['keypoints'][7], 
                    detectedPose['keypoints'][9]
                );
                break;
            case 'EasybarCurl':
                anglePercentage = getAnglePercentage(
                    135, 
                    45, 
                    detectedPose['keypoints'][6], 
                    detectedPose['keypoints'][8], 
                    detectedPose['keypoints'][10]
                );
                break;
            case 'HammerCurl':
                anglePercentage = getAnglePercentage(
                    170, 
                    90, 
                    detectedPose['keypoints'][5], 
                    detectedPose['keypoints'][7], 
                    detectedPose['keypoints'][9]
                );
                break;
            case 'InclinePress':
                anglePercentage = getAnglePercentage(
                    60, 
                    170, 
                    detectedPose['keypoints'][5], 
                    detectedPose['keypoints'][7], 
                    detectedPose['keypoints'][9]
                );
                break;
            case 'LatPullDown':
                anglePercentage = getAnglePercentage(
                    170, 
                    70, 
                    detectedPose['keypoints'][5], 
                    detectedPose['keypoints'][7], 
                    detectedPose['keypoints'][9]
                );
                break;
            case 'LegPress':
                anglePercentage = getAnglePercentage(
                    70, 
                    170, 
                    detectedPose['keypoints'][12], 
                    detectedPose['keypoints'][14], 
                    detectedPose['keypoints'][16]
                );
                break;
            case 'PecDeckFly':
                break;
            case 'ReversePecDeckFly':
                break;
            case 'SeatedRow':
                anglePercentage = getAnglePercentage(
                    170, 
                    80, 
                    detectedPose['keypoints'][6], 
                    detectedPose['keypoints'][8], 
                    detectedPose['keypoints'][10]
                );
                break;
            case 'ShoulderPress':
                anglePercentage = getAnglePercentage(
                    90, 
                    160, 
                    detectedPose['keypoints'][5], 
                    detectedPose['keypoints'][7], 
                    detectedPose['keypoints'][9]
                );
                break;
        }
        return anglePercentage
    }

    // 운동 개수 측정 함수
    const countExercise = () => {
        switch (exerciseName) {
            case 'SitUp':
            case 'SideLateralRaise':
            case 'SeatedKneeUp':
            case 'LyingTricepsExtension':
            case 'LegExtension':
            case 'ArmCurl':
            case 'BarbellRow':
            case 'Crunch':
            case 'DumbbellKickBack':
            case 'EasybarCurl':
            case 'HammerCurl':
            case 'LegPress':
            case 'PecDeckFly':
            case 'ShoulderPress':
                if (classifiedPose == 'correctUp') {
                    countStart();
                } else if (classifiedPose == 'correctDown') {
                    countEnd();
                }
                break;
            case 'PushUp':
            case 'BenchPress':
            case 'LightSquat':
            case 'Squat':
            case 'CablePushDown':
            case 'InclinePress':
            case 'LatPullDown':
            case 'ReversePecDeckFly':
            case 'SeatedRow':
                if (classifiedPose == 'correctDown') {
                    countStart();
                } else if (classifiedPose == 'correctUp') {
                    countEnd();
                }
                break;
            case 'Plank':
                break;
        }
    }

    // util 함수들
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

    // url의 snake_case를 PascalCase로 변경
    function snake2Pascal(exercise_name) {
        return exercise_name
                .split('_')
                .map(x => x.charAt(0).toUpperCase() + x.slice(1))
                .join()
                .replaceAll(',', '');
    }
    
    // 세 점의 좌표를 입력받아 퍼센트 반환
    const getAnglePercentage = async (start, end, p1, p2, p3) => {
        let current = jointAngle(p1['x'], p1['y'], p2['x'], p2['y'], p3['x'], p3['y']);
        // console.log('current: ', current);
        let diff;
        if (end - start < 0) {
            diff = start - current;
        } else {
            diff = current - start;
        }

        let percent = diff / Math.abs(end-start) * 100;
        if (percent >= 100) {
            percent = 100;
        } else if (percent < 0) {
            percent = 0;
        }
        return percent;
    }

    // 운동 개수 카운트
    const countStart = () => {
        if(countStack.length < 7) {
            if(countStack.length == 6) {
                if(countState == true) {
                    switch(exerciseName) {
                        case 'BenchPress':
                            var audio = new Audio('/audios/arm_down_to_down.mp3');
                            dispatch(send_posture_of_exercise("팔을 더 올려주세요"));
                            break;
                        
                        case 'InclinePress':
                            var audio = new Audio('/audios/arm_down_to_down.mp3');
                            dispatch(send_posture_of_exercise("팔을 더 올려주세요"));
                            break;
                    
                        case 'SideLateralRaise':
                            var audio = new Audio('/audios/arm_up_to_up.mp3');
                            dispatch(send_posture_of_exercise("팔을 더 내려주세요"));
                            break;
                        
                        case 'PushUp':
                            var audio = new Audio('/audios/arm2_down_to_down.mp3');
                            dispatch(send_posture_of_exercise("팔을 더 펴주세요"));
                            break;

                        case 'SitUp':
                            var audio = new Audio('/audios/upperbody_up_to_up.mp3');
                            dispatch(send_posture_of_exercise("상체를 더 내려주세요"));
                            break;
                        
                        case 'LightSquat':
                            var audio = new Audio('/audios/leg_down_to_down.mp3');
                            dispatch(send_posture_of_exercise("다리을 더 펴주세요"));
                            break;
                    }
                    audio.play().catch(e => {
                        console.log(e);
                    });
                }
                else {
                    countState = true;
                }
            }
            countStack.push(1);
        }
    }

    const countEnd = () => {
        if(countStack.length > 0) {
            if(countStack.length == 1 && countState == true) {
                countState = false;
                count.current++;
                dispatch(pushup_count());

                if(count.current == 7 || count.current == 11) {
                    var audio = new Audio('/audios/good.mp3');
                    audio.play().catch(e => {
                        console.log(e);
                    });
                } 
                else if(count.current == 12) {
                    var audio = new Audio('/audios/excellent.mp3');
                    audio.play().catch(e => {
                        console.log(e);
                    });
                }
                else {
                    var audio = new Audio('/audios/intermediate_' + count.current + '.mp3');
                    audio.play().catch(e => {
                        console.log(e);
                    });
                }   
            }
            else if(countStack.length == 1 && countState == false) {
                switch(exerciseName) {
                    case 'BenchPress':
                        var audio = new Audio('/audios/arm_up_to_up.mp3');
                        dispatch(send_posture_of_exercise("팔을 더 내려주세요"));
                        break;
                    
                    case 'InclinePress':
                        var audio = new Audio('/audios/arm_up_to_up.mp3');
                        dispatch(send_posture_of_exercise("팔을 더 내려주세요"));
                        break;
                
                    case 'SideLateralRaise':
                        var audio = new Audio('/audios/arm_down_to_down.mp3');
                        dispatch(send_posture_of_exercise("팔을 더 올려주세요"));
                        break;

                    case 'PushUp':
                        var audio = new Audio('/audios/arm2_up_to_up.mp3');
                        dispatch(send_posture_of_exercise("팔을 더 굽혀주세요"));
                        break;

                    case 'SitUp':
                        var audio = new Audio('/audios/upperbody_down_to_down.mp3');
                        dispatch(send_posture_of_exercise("상체를 더 올려주세요"));
                        break;
                    
                    case 'LightSquat':
                        var audio = new Audio('/audios/leg_up_to_up.mp3');
                        dispatch(send_posture_of_exercise("다리를 더 굽혀주세요"));
                        break;
                }
                audio.play().catch(e => {
                    console.log(e);
                });
            }
            countStack.pop();
        }
    }

    const audioPlay = (audio) => {
        if((audioLock == false)) {
            audioLock = true;
            audio.play();
            
            audio.addEventListener('ended', () => { 
                setTimeout(function() {
                    audioLock = false; 
                }, 1000);
            });
        }
    }

    //dispatch(pushup_count());

    useEffect(()=>{
        runMovenet();//디스패치를 시키면 상태변화때문에 부모 컴포넌트에서 리랜더링되면 카메라도 리랜더링 될것이라서 그때마다 setInterval시키면 계속쌓임 따라서 한번만 실행
    
    },[])

    //detect();
    return (
        <div>
                {/* <video
                ref={videoRef}
                // width={videoFileWidth}
                // height={videoFileHeight}
                // url={videoPaths["path"+videoPathNum]}
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
                    top: "0em",
                    objectFit: "fill",
                }}
                >
                    <source src={videoPaths["path"+videoPathNum]} type="video/mp4"></source>
                </video> */}

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