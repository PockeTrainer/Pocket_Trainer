import React, { Component, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/MyPage/CheckPwPage.css';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
// import ml5 from "ml5";
import '@tensorflow/tfjs-backend-webgl';
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import { NonMaxSuppressionV3, time, version_layers } from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-backend-wasm';

import * as cm from './ClassificationModel';
// import { Player } from 'video-react';

// 학습에 사용할 비디오 파일 경로.
// useVideo -> play -> nextVideo
// 비디오 파일은 public/videos/ 에 둘 것.
// `${proecss.env.PUBLIC_URL}/videos/` == `public/videos/`
const videoPaths = {
    // benchpress output4 ratio
    // path0: `${process.env.PUBLIC_URL}/videos/BenchPress/front/correctDown_front2_h264.mp4`,
    // path1: `${process.env.PUBLIC_URL}/videos/BenchPRess/front/correctUp_front3_h264.mp4`,
    // path2: `${process.env.PUBLIC_URL}/videos/BenchPRess/front/leanToLeft_front_h264.mp4`,
    // path3: `${process.env.PUBLIC_URL}/videos/BenchPRess/front/leanToRight_front_h264.mp4`,
    // // path4: `${process.env.PUBLIC_URL}/videos/BenchPRess/front/leanToRight_front2_h264.mp4`,
    
    // PushUp
    // path0: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_correctDown1_h264.mp4`,
    // path1: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_correctDown2_h264.mp4`,
    // path2: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_correctDown3_h264.mp4`,
    // path3: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_correctDown4_h264.mp4`,
    // path4: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_correctDown5_h264.mp4`,
    // path5: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_correctDown6_h264.mp4`,

    // path6: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_correctUp1_h264.mp4`,
    // path7: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_correctUp2_h264.mp4`,
    // path8: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_correctUp3_h264.mp4`,
    // path9: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_correctUp4_h264.mp4`,
    // path10: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_correctUp5_h264.mp4`,

    // path11: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_lessDown1_h264.mp4`,
    // path12: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_lessDown2_h264.mp4`,
    // path13: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_lessDown3_h264.mp4`,
    // path14: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_lessDown5_h264.mp4`,
    // path15: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_lessDown6_h264.mp4`,
    
    // path16: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_tooWide1_h264.mp4`,
    // path17: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_tooWide2_h264.mp4`,
    // path18: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_tooWide3_h264.mp4`,
    // path19: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_tooWide4_h264.mp4`,
    // path20: `${process.env.PUBLIC_URL}/videos/PushUp/PushUp_tooWide5_h264.mp4`,

    // Squat
    path0: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctDown1_h264.mp4`,
    path1: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctDown2_h264.mp4`,
    path2: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctDown3_h264.mp4`,
    path3: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctDown4_h264.mp4`,
    path4: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctDown5_h264.mp4`,
    path5: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctDown6_h264.mp4`,
    path6: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctDown9_h264.mp4`,
    path7: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctDown10_h264.mp4`,
    path8: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctDown11_h264.mp4`,
    path9: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctDown12_h264.mp4`,

    path10: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctUp1_h264.mp4`,
    path11: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctUp2_h264.mp4`,
    path12: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctUp3_h264.mp4`,
    path13: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctUp4_h264.mp4`,
    path14: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctUp5_h264.mp4`,
    path15: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctUp6_h264.mp4`,
    path16: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctUp7_h264.mp4`,
    path17: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctUp8_h264.mp4`,
    path18: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctUp9_h264.mp4`,
    path19: `${process.env.PUBLIC_URL}/videos/Squat/Squat_correctUp10_h264.mp4`,

    path20: `${process.env.PUBLIC_URL}/videos/Squat/Squat_lessDown1_h264.mp4`,
    path21: `${process.env.PUBLIC_URL}/videos/Squat/Squat_lessDown2_h264.mp4`,
    path22: `${process.env.PUBLIC_URL}/videos/Squat/Squat_lessDown3_h264.mp4`,
    path23: `${process.env.PUBLIC_URL}/videos/Squat/Squat_lessDown4_h264.mp4`,
    path24: `${process.env.PUBLIC_URL}/videos/Squat/Squat_lessDown7_h264.mp4`,
    path25: `${process.env.PUBLIC_URL}/videos/Squat/Squat_lessDown8_h264.mp4`,
    path26: `${process.env.PUBLIC_URL}/videos/Squat/Squat_lessDown9_h264.mp4`,
    path27: `${process.env.PUBLIC_URL}/videos/Squat/Squat_lessDown10_h264.mp4`,
    
    path28: `${process.env.PUBLIC_URL}/videos/Squat/Squat_tooBend1_h264.mp4`,
    path29: `${process.env.PUBLIC_URL}/videos/Squat/Squat_tooBend2_h264.mp4`,
    path30: `${process.env.PUBLIC_URL}/videos/Squat/Squat_tooBend3_h264.mp4`,
    path31: `${process.env.PUBLIC_URL}/videos/Squat/Squat_tooBend4_h264.mp4`,
    path32: `${process.env.PUBLIC_URL}/videos/Squat/Squat_tooBend5_h264.mp4`,
    path33: `${process.env.PUBLIC_URL}/videos/Squat/Squat_tooBend6_h264.mp4`,
    path34: `${process.env.PUBLIC_URL}/videos/Squat/Squat_tooBend7_h264.mp4`,
    path35: `${process.env.PUBLIC_URL}/videos/Squat/Squat_tooBend8_h264.mp4`,
    path36: `${process.env.PUBLIC_URL}/videos/Squat/Squat_tooBend9_h264.mp4`,
    path37: `${process.env.PUBLIC_URL}/videos/Squat/Squat_tooBend10_h264.mp4`,
    path38: `${process.env.PUBLIC_URL}/videos/Squat/Squat_tooBend11_h264.mp4`,
    path39: `${process.env.PUBLIC_URL}/videos/Squat/Squat_tooBend12_h264.mp4`,

}

let brain = null;

function CheckPwPage() {
    // const videoFileWidth = "270px";
    // const videoFileHeight = "480px";

    // React Settings
    const webcamRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const inputRef = useRef(null);

    const[videoPathNum, setVideoPathNum] = useState(0);

    const nextVideoPathNum = () => {
        console.log('change video path to next');
        setVideoPathNum(prev => prev + 1)
        videoRef.current.load();
    }

    const previousVideoPathNum = () => {
        console.log('change video path to previous');
        setVideoPathNum(prev => prev - 1)
        videoRef.current.load();
    }

    const [use, setUse] = useState('webcam');

    const useWebcam = () => {
        console.log('use webcam');
        setUse('webcam');
    }

    const useVideo = () => {
        console.log('use video');
        setUse('video');
    }

    // 기본 모드는 train. 실행 중 버튼으로 변경도 되고, 이 값을 바꿔도 됨.
    const [mode, setMode] = useState('train');

    const dataMode = () => {
        // console.log('mode: data');
        setMode('data');
    }
    
    const trainMode = () => {
        // console.log('mode: train');
        setMode('train');
    }
    
    const classifyMode = () => {
        // console.log('mode: classify');
        setMode('classify');
    }

    const [state, setState] = useState('waiting');
    const [targetPose, setTargetPose] = useState('');

    const timeId = useRef(null);

    useEffect(() => {
        if (timeId.current !== null) {
            clearInterval(timeId.current);
        }
        runMovenet();
    }, [mode, use, state, videoPathNum]);

    // ################
    // ### 모델 관련 ###
    // ################
    let movenetLoaded = false;

    let classifiedPose;
    let detectedPose;

    let loadedModel = null;

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
        'right_wrist_X', 'right_wrist_Y',
        'left_hip_X', 'left_hip_Y',
        'right_hip_X', 'right_hip_Y',
        'left_knee_X', 'left_knee_Y',
        'right_knee_X', 'right_knee_Y',
        'left_ankle_X', 'left_ankle_Y',
        'right_ankle_X', 'right_ankle_Y'
    ];

    // 학습시킬 Epoch 수. 원하는 만큼 변경 가능.
    let trainEpochs = 500;

    // 모델 입력 및 출력 크기
    // 운동에 따라 출력 크기 변경
    const modelInputSize = 34;
    const modelOutputSize = 4;

    // dataFileName : 데이터 수집 후 저장 시 저장되는 파일 명.
    // dataFilePath : 학습을 위해 불러올 데이터 경로. 웹 상에 올라가야 함. (지금은 github repository에 올려둠.)
    let dataFileName = 'PushUpData';
    let dataFilePath = 'https://raw.githubusercontent.com/Oneul1213/FileStorage/main/PushUp/PushUpData.csv';
    
    // modelName : 학습 후 저장될 데이터 파일, 가중치 파일 이름. 
    //             저장 후 변경 시 에러 발생하니 여기서 지정한 후 저장할 것.
    // modelUrl : 불러올 학습된 모델의 url. 웹 상에 올라가야 함. (지금은 github repository에 올려둠.)
    let modelName = 'PushUpModel';
    let modelUrl = 'https://raw.githubusercontent.com/Oneul1213/FileStorage/main/BenchPress/BenchPressModel_output4_ratio.json';

    // autoTraining = true; 로 설정 후 train mode로 실행 시
    // 데이터 불러온 후 학습 시작을 자동으로 해줌.
    let autoTraining = false;

    /* for data collecting...1s */
    // if (mode == 'data') {
    //     // var targetPose;
    //     // var state = 'waiting';
    // }
    /* for data collecting...1e */


    // 여러가지 함수 부분

    // Movenet 관련
    const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER};
    const runMovenet = async () => {
        console.log('---------------------------------');
        if (brain == null) {
            console.log('get brain');
            brain = new cm.ClassificationModel(modelInputSize, modelOutputSize);
        }
        console.log('running movenet');
        console.log('mode: ', mode);
        console.log('vidoePathNum: ', videoPathNum);

        /* for classifying...2s */
        if (mode == 'classify') {
            brain.loadModel(modelUrl, modelLoaded);
        }
        /* for classifying...2e */
        
        /* for data collecting & classifying...2s */
        if (mode == 'data' || mode == 'classify') {
            const detector = await poseDetection.createDetector(
                poseDetection.SupportedModels.MoveNet, 
                detectorConfig,
            )
            timeId.current = setInterval(() => {
                detect(detector);
            }, 100);
        }
        /* for data collecting...2e */

        if (mode == 'train' && autoTraining) {
            brain.loadData(dataFilePath, dataLoaded)
        }
    }

    const detect = async (detector) => {
        if (use == 'webcam') {
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
    
                if (!movenetLoaded) {
                    console.log('movenet now loading...');
                }
                const poses = await detector.estimatePoses(video);
                if (!movenetLoaded) {
                    console.log('load movenet complete');
                    movenetLoaded = true;
                }
                
                // const poses = [];
    
                if (poses.length > 0) { 
                    /* for data collecting...3s */
                    if (mode == 'data') {
                        collectingData(poses[0]);
                    }
                    /* for data collecting...3e */
    
                    detectedPose = poses[0];
                    // for classifying...3s
                    if (mode == 'classify') {
                        classifyPose();
                    }
                    // for classifying...3e
                    drawCanvas(poses[0], video, videoWidth, videoHeight, canvasRef.current);
                }
            }
        } else {
            if (
                typeof videoRef.current !== "undefined" &&
                videoRef.current !== null &&
                videoRef.current.readyState == 4
            ) {    
                // Get Video Properties
                const video = videoRef.current;
                
                // const videoWidth = videoRef.current.videoWidth * 0.25;
                // const videoHeight = videoRef.current.videoHeight * 0.25;
                const videoWidth = 640;
                const videoHeight = 480;
    
                videoRef.current.width = videoWidth;
                videoRef.current.height = videoHeight;
    

                if (!movenetLoaded) {
                    console.log('movenet now loading...');
                }
                const poses = await detector.estimatePoses(video);
                if (!movenetLoaded) {
                    console.log('load movenet complete');
                    movenetLoaded = true;
                }
                
                // const poses = [];
    
                if (poses.length > 0) { 
                    /* for data collecting...3s */
                    if (mode == 'data') {
                        collectingData(poses[0]);
                    }
                    /* for data collecting...3e */
    
                    detectedPose = poses[0];
                    // for classifying...3s
                    if (mode == 'classify') {
                        classifyPose();
                    }
                    // for classifying...3e
                    drawCanvas(poses[0], video, videoWidth, videoHeight, canvasRef.current);
                }
            }
        }
        
    }

    const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
        const ctx = canvas.getContext("2d");
        // console.log("w, h : ", videoWidth, videoHeight)

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        if (use == 'webcam') {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        }

        // 분류하고자 하는 자세에 따라 적절히 변경. (gotResult의 switch 문도 변경 필요.)
        /* for classifying...5s */
        if (mode == 'classify') {
            switch(classifiedPose) {
                case 'correctDown':
                    console.log('정자세 아래');
                    break;
                case 'correctUp':
                    console.log('정자세 위');
                    break;
                case 'leanToLeft':
                    console.log('왼쪽으로 치우침');
                    break;
                case 'leanToRight':
                    console.log('오른쪽으로 치우침');
                    break;
                default:
                    console.log('알수 없음');
                    break;
            }

        }
        /* for classifying...5e */
        let xScale, yScale;
        if ( use == 'webcam' ) {
            xScale = 640 / webcamRef.current.video.videoWidth;
            yScale = 480 / webcamRef.current.video.videoHeight;
        } else {
            xScale = 640 / videoRef.current.videoWidth;
            yScale = 480 / videoRef.current.videoHeight;
        }
        // console.log("scale: ", scale);
        drawKeypoints(pose["keypoints"], 0.3, ctx, xScale, yScale); //0.6
        drawSkeleton(pose["keypoints"], 0.4, ctx, xScale, yScale); // 0.7
    };

    // data mode에서 데이터 수집하는 함수
    /* for data collecting...4s */
    function collectingData(pose) {
        if (state == 'collecting') {
            let rowObj = {};
            for (let i = 0; i < pose['keypoints'].length; i++) {
                let nameX = pose['keypoints'][i]['name'] + '_X';
                let nameY = pose['keypoints'][i]['name'] + '_Y';
                let x = pose['keypoints'][i]['x'];
                let y = pose['keypoints'][i]['y'];

                let videoWidth, videoHeight;
                if ( use == 'webcam') {
                    videoWidth = webcamRef.current.video.videoWidth;
                    videoHeight = webcamRef.current.video.videoHeight;
                } else {
                    videoWidth = videoRef.current.videoWidth;
                    videoHeight = videoRef.current.videoHeight;
                }
                let ratioX = x / videoWidth;
                let ratioY = y / videoHeight;

                rowObj[nameX] = ratioX;
                rowObj[nameY] = ratioY;
            }

            rowObj['targetPose'] = targetPose;
            brain.addData(rowObj);
        }
    }
    /* for data collecting...4e */


    // classify mode에서 웹캠의 자세를 분류하는 함수
    /* for classifying...4s */
    const classifyPose = async () => {
        if (detectedPose) {
            let rowObj = {};

            for (let i = 0; i < detectedPose['keypoints'].length; i++) {
                let nameX = detectedPose['keypoints'][i]['name'] + '_X';
                let nameY = detectedPose['keypoints'][i]['name'] + '_Y';
                let x = detectedPose['keypoints'][i]['x'];
                let y = detectedPose['keypoints'][i]['y'];

                let videoWidth, videoHeight;
                if ( use == 'webcam') {
                    videoWidth = webcamRef.current.video.videoWidth;
                    videoHeight = webcamRef.current.video.videoHeight;
                } else {
                    videoWidth = videoRef.current.videoWidth;
                    videoHeight = videoRef.current.videoHeight;
                }
                let ratioX = x / videoWidth;
                let ratioY = y / videoHeight;

                rowObj[nameX] = ratioX;
                rowObj[nameY] = ratioY;
            }

            brain.classify(rowObj, loadedModel, gotResult);
        } else {
            setTimeout(classifyPose, 100);
        }
    }

    // brain.classify의 콜백함수.
    const gotResult = async (results) => {
        // console.log('gotResult start');
        let resultArray = results.arraySync();
        // console.log('resultArray: ', resultArray);
        // console.log('max value: ', Math.max(...resultArray[0]));

        var idx = resultArray[0].findIndex((element, index, array) => {
            if (element == Math.max(...array)) {
                return true;
            }
        });

        // 분류하고자 하는 자세에 따라 적절히 변경. (drawCanvas의 switch 문도 변경 필요.)
        switch(idx) {
            case 0:
                classifiedPose = 'correctDown';
                break;
            case 1:
                classifiedPose = 'correctUp';
                break;
            case 2:
                classifiedPose = 'leanToLeft';
                break;
            case 3:
                classifiedPose = 'leanToRight';
                break;
            default:
                classifiedPose = 'none';
                break;
        }

        console.log(classifiedPose);
    }
    /* for classifying...4e */

    const modelLoaded = async (model) => {
        console.log('model loaded')

        loadedModel = model;
    }

    // 콜백 함수들

    // autuTraining = true일 때 사용되는 함수.
    const dataLoaded = () => {
        brain.trainModel(trainEpochs, inputNames, modelTrained);
    }

    /* for training...2s */
    function modelTrained(result) {
        console.log('model trained');
        brain.saveModel(modelName);
    }
    /* for training...2e */

    // 버튼 입력 관련 함수
    // key focus 버튼 누른 후 사용.
    // v : saVe data
    // d : load Data
    // r : tRaining start
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
                brain.trainModel(trainEpochs, inputNames, modelTrained);
            }
        }
    }

    const onButtonPlayClick = () => {
        videoRef.current.play();
        videoRef.current.onended = onEnd;

        console.log('collecting');
        setState('collecting');
    }

    const onEnd = () => {
        console.log('not collecting');
        setState('waiting');
    }

    const onChange = (e) => {
        setTargetPose(e.target.value);
    }

    const changeTargetPose = () => {
        setTargetPose(inputRef.current.value);
        console.log('ready for collect', targetPose, 'pose');
    }

    // runMovenet();
    return (
        <div className="App">
            <header className="App-header">
                { use == 'webcam' && 
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
                    // width: 640,
                    // height: 480,
                    width: "100%",
                    height: "33em",
                    top: "0em",
                    objectFit: "fill",
                }}
                />}
                
                { use == 'video' && 
                <video
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
                    height: "33em",
                    top: "0em",
                    objectFit: "fill",
                }}
                >
                    <source src={videoPaths["path"+videoPathNum]} type="video/mp4"></source>
                </video>
                }
                
                <canvas
                    ref={canvasRef}
                    // width={videoFileWidth}
                    // height={videoFileHeight}
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
                        width: "100%",
                        height: "33em",
                        top: "0em",
                        objectFit: "fill",
                    }}
                />
                
                <div className="buttons"
                    style={{
                        position: "absolute",
                        top: "80%",
                    }}>
                    
                    <button type="button"
                        onClick={useWebcam}>
                        Use Webcam
                    </button>

                    <button type="button"
                        onClick={useVideo}>
                        Use Video File
                    </button>

                    <br></br>
                    
                    <button type="button"
                        onKeyPress={handleKeyPress}>
                        key focus
                    </button>

                    <button type="button"
                        onClick={onButtonPlayClick}>
                        play
                    </button>

                    <button type="button"
                        onClick={previousVideoPathNum}>
                        previous video
                    </button>
                    
                    <button type="button"
                        onClick={nextVideoPathNum}>
                        next video
                    </button>

                    <br></br>

                    <button type="button"
                        onClick={dataMode}>
                        data mode
                    </button>

                    <button type="button"
                        onClick={trainMode}>
                        train mode
                    </button>

                    <button type="button"
                        onClick={classifyMode}>
                        classify mode
                    </button>

                    <br></br>

                    <input type="text"
                        ref={inputRef}
                        onChange={onChange}
                        value={targetPose}></input>
                    <button type="button"
                        onClick={changeTargetPose}>
                        change targetPose
                    </button>
                    <div>
                        <b>targetPose : {targetPose}</b>
                    </div>
                </div>                
            </header>
        </div>
    );
}
    

export default CheckPwPage;