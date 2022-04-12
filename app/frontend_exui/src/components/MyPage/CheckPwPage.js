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
// useVideo -> play -> (nextVideo or previousVideo)
// change videoPathNum 으로도 경로 변경 가능
// 비디오 파일은 public/videos/ 에 둘 것.
// `${proecss.env.PUBLIC_URL}/videos/` == `public/videos/`
const videoPaths = {
    // BenchPress don't move
    path0: `${process.env.PUBLIC_URL}/videos/BenchPress/dontmove/correctDown1_h264.mp4`,
    
}

// 세 점 사이의 각도 구하기
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

let brain = null;

function CheckPwPage() {
    // const videoFileWidth = "270px";
    // const videoFileHeight = "480px";

    // React Settings
    const webcamRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const poseRef = useRef(null);
    const pathRef = useRef(null);

    // const[videoPathNum, setVideoPathNum] = useState(0);

    const nextVideoPathNum = () => {
        console.log('change video path to next');
        // setVideoPathNum(prev => prev + 1)
        setInputs({
            ...inputs,
            ['videoPathNum']: parseInt(pathRef.current.value) + 1
        });
        videoRef.current.load();
    }

    const previousVideoPathNum = () => {
        console.log('change video path to previous');
        // setVideoPathNum(prev => prev - 1)
        setInputs({
            ...inputs,
            ['videoPathNum']: parseInt(pathRef.current.value) - 1
        });
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
    // const [targetPose, setTargetPose] = useState('');
    const [inputs, setInputs] = useState({
        videoPathNum: 0,
        targetPose: ''
    });

    const { videoPathNum, targetPose } = inputs;

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

    // exerciseName : 학습/분류할 운동 이름
    // -> exerciseName이 변경되면 dataFileName, dataFilePath와 modelName, modelPath에 반영됨.
    // -> drawCanvas, gotResult에 if문 추가해두면 exerciseName만 변경되면 추가 코드 수정 필요 없음.
    let exerciseName = 'BenchPress';

    // 학습시킬 Epoch 수. 원하는 만큼 변경 가능.
    let trainEpochs = 100;

    // 모델 입력 및 출력 크기
    // 운동에 따라 출력 크기 변경
    let modelInputSize = 34;
    let modelOutputSize = 3;
    if (exerciseName == 'Sqaut' || exerciseName == 'CablePushDown') {
        modelOutputSize = 4;
    }

    // dataFileName : 데이터 수집 후 저장 시 저장되는 파일 명.
    // dataFilePath : 학습을 위해 불러올 데이터 경로. 웹 상에 올라가야 함. (지금은 github repository에 올려둠.)
    let dataFileName = exerciseName + 'Data';
    let dataFilePath = 'https://raw.githubusercontent.com/Oneul1213/FileStorage/main/' + exerciseName + '/' + dataFileName + '.csv';

    // modelName : 학습 후 저장될 데이터 파일, 가중치 파일 이름. 
    //             저장 후 변경 시 에러 발생하니 여기서 지정한 후 저장할 것.
    // modelUrl : 불러올 학습된 모델의 url. 웹 상에 올라가야 함. (지금은 github repository에 올려둠.)
    let modelName = exerciseName + 'Model';
    let modelUrl = 'https://raw.githubusercontent.com/Oneul1213/FileStorage/main/' + exerciseName + '/' + modelName + '.json';

    // autoTraining = true; 로 설정 후 train mode로 실행 시
    // 데이터 불러온 후 학습 시작을 자동으로 해줌.
    let autoTraining = false;


    // 여러가지 함수 부분

    // Movenet 관련
    // detectorConfig : *.SINGLEPOSE_LIGHTNING / *.SINGLEPOSE_THUNDER 중 선택
    //                  LIGHTNING : 가볍고 성능 약간 낮음
    //                  THUNDER : 약간 무겁고 성능 높음
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
        console.log('Exercise Name : ', exerciseName);

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
                        // showAnglePercentage : 세 점의 좌표를 입력받아 퍼센트 출력
                        //                       poses[0]['keypoints'][11] 형태로 입력
                        if (exerciseName == 'Squat') {
                            showAnglePercentage(
                                poses[0]['keypoints'][11], 
                                poses[0]['keypoints'][13], 
                                poses[0]['keypoints'][15]);
                        }
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
                        // showAnglePercentage : 세 점의 좌표를 입력받아 퍼센트 출력
                        //                       poses[0]['keypoints'][11] 형태로 입력
                        if (exerciseName == 'Squat') {
                            showAnglePercentage(
                                poses[0]['keypoints'][11], 
                                poses[0]['keypoints'][13], 
                                poses[0]['keypoints'][15]);
                        }
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

        // 분류하고자 하는 자세를 추가해주어야 함. (gotResult의 switch 문도 변경 필요.)
        /* for classifying...5s */
        if (mode == 'classify') {
            if (exerciseName == 'PushUp') {
                switch(classifiedPose) {
                    case 'correctDown':
                        console.log('정자세 아래');
                        break;
                    case 'correctUp':
                        console.log('정자세 위');
                        break;
                    case 'lessDown':
                        console.log('덜 내려감');
                        break;
                    default:
                        console.log('알수 없음');
                        break;
                }
            } else if (exerciseName == 'Squat') {
                switch(classifiedPose) {
                    case 'correctDown':
                        console.log('정자세 아래');
                        break;
                    case 'correctUp':
                        console.log('정자세 위');
                        break;
                    case 'lessDown':
                        console.log('덜 내려감');
                        break;
                    case 'tooBend':
                        console.log('허리 너무 숙임');
                        break;
                    default:
                        console.log('알수 없음');
                        break;
                }
            } else if (exerciseName == 'BenchPress') {
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
            } else if (exerciseName == 'SideLateralRaise') {
                switch(classifiedPose) {
                    case 'correctUp':
                        console.log('정자세 올림');
                        break;
                    case 'correctDown':
                        console.log('정자세 내림');
                        break;
                    case 'lessUp':
                        console.log('덜 올림');
                        break;
                    default:
                        console.log('알수 없음');
                        break;
                }
            } else if (exerciseName == 'CablePushDown') {
                switch(classifiedPose) {
                    case 'correctUp':
                        console.log('정자세 굽힘');
                        break;
                    case 'correctDown':
                        console.log('정자세 핌');
                        break;
                    case 'lessUp':
                        console.log('팔 덜 굽힘');
                        break;
                    case 'lessDown':
                        console.log('팔 덜 핌');
                        break;
                    default:
                        console.log('알수 없음');
                        break;
                }
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
            // for (let i = 5; i < 13; i++) {
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
            // for (let i = 5; i < 13; i++) {
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

    const showAnglePercentage = async (p1, p2, p3) => {
        let full = 90;
        let current = jointAngle(p1['x'], p1['y'], p2['x'], p2['y'], p3['x'], p3['y']);
        console.log('current: ', current);
        let percent = (180-current) / full * 100;
        if (percent >= 100) {
            percent = 100;
        }
        console.log(percent, '%');
    }

    // 콜백 함수들

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

        // 분류하고자 하는 자세를 추가해주어야 함. (drawCanvas의 switch 문도 변경 필요.)
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
        } else if (exerciseName == 'BenchPress') {
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
                    classifiedPose = 'lessDown';
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
                    classifiedPose = 'lessUp';
                    break;
                case 3:
                    classifiedPose = 'lessDown';
                    break;
                default:
                    classifiedPose = 'none';
                    break;
            }
        }

        console.log(classifiedPose);
    }
    /* for classifying...4e */

    const modelLoaded = async (model) => {
        console.log('model loaded')

        loadedModel = model;
    }

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

    const onKeyFocusClick = () => {
        console.log('can use keyboard input');
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
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const changeVideoPathNum = () => {
        setInputs({
            ...inputs,
            ['videoPathNum']: pathRef.current.value
        });
        console.log('change videoPathNum: ', videoPathNum);
        videoRef.current.load()
    }

    const changeTargetPose = () => {
        setInputs({
            ...inputs,
            ['targetPose']: poseRef.current.value
        });
        // setTargetPose(poseRef.current.value);
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
                        onClick={onKeyFocusClick}
                        onKeyPress={handleKeyPress}>
                        key focus
                    </button>
                    
                    <button type="button"
                        onClick={useWebcam}>
                        Use Webcam
                    </button>

                    <button type="button"
                        onClick={useVideo}>
                        Use Video File
                    </button>

                    <br></br>

                    <input type="text"
                        ref={pathRef}
                        name="videoPathNum"
                        onChange={onChange}
                        value={videoPathNum}></input>
                    <button type="button"
                        onClick={changeVideoPathNum}>
                        change videoPathNum
                    </button>
                    <br></br>

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
                        ref={poseRef}
                        name="targetPose"
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