import { easy } from "../modules/action";

export class Exercise{//필요한 이유 서버데이터+상수데이터를 하나로 합친 정보가 필요함
    constructor(Info_from_api,Exercise_Info){//여기서는 api값들로 받은 것들을 넣어주자+상수값
        this.Info_from_api=Info_from_api
        this.name=Exercise_Info.name;
        this.instruction=Exercise_Info.instruction;
        this.image_url=Exercise_Info.image_url;
        this.musclePart=Exercise_Info.musclePart;
        this.part=Exercise_Info.part
        this.eng_name=Exercise_Info.eng_name;
        this.unit_kg=Exercise_Info.unit_kg;
        this.eng_part=Exercise_Info.eng_part;
        this.break_time=Exercise_Info.break_time;
    }
    

    set Info_from_api(Info_from_api){
        this._Info_from_api=Info_from_api
    }

    get Info_from_api(){
        return this._Info_from_api
    }

    set name(name){
        this._name=name;
    }

    get name(){
        return this._name;
    }

    set instruction(instruction){
        this._instruction=instruction
    }

    get instruction(){
        return this._instruction;
    }

    set image_url(image_url){
        this._image_url=image_url;
    }

    get image_url(){
        return this._image_url;
    }

    set musclePart(muscle_part){
        this._musclePart=muscle_part;
    }

    get musclePart(){
        return this._musclePart;
    }

    set part(part){
        this._part=part;
    }

    get part(){
        return this._part;
    }

    set eng_name(eng_name){
        this._eng_name=eng_name;
    }

    get eng_name(){
        return this._eng_name;
    }


    set unit_kg(unit_kg){
        this._unit_kg=unit_kg;
    }

    get unit_kg(){
        return this._unit_kg;
    }

    set eng_part(eng_part){
        this._eng_part=eng_part;
    }

    get eng_part(){
        return this._eng_part;
    }

    set break_time(break_time){
        this._break_time=break_time;
    }

    get break_time(){
        return this._break_time;
    }
}


//각 bodypart에 따른 한글부위명

export const bodypart={
    chest:"가슴",
    back:"등",
    shoulder:"어깨",
    bicep:"이두",
    tricep:"삼두",
    abs:"복근",
    leg:"하체"
}



//여기는 체력측정부분의 운동들을 상수로 담아놓음
export const Pushup={
    name:"푸시업",
    image_url:"../assets/img/theme/pushup_animated.gif",
    instruction:"푸시업은 상체부분에 대표적인 근력운동으로서 상체근육의 근발달정도를 가늠할 때 사용합니다"
}

export const Situp={
    name:"싯업",
    image_url:"../assets/img/theme/Situp_animated.gif",
    instruction:"싯업은 대표적인 복부운동으로서 복부근육의 근발달정도를 가늠할 때 사용합니다"
}

export const Squat={
    name:"스쿼트",
    image_url:"../assets/img/theme/squat_animated.gif",
    instruction:"스쿼트는 하체부분에 대표적인 근력운동으로서 하체근육의 근발달정도를 가늠할 때 사용합니다"
}

export const pushup_content={
    title:"상체측정\n[푸시업]",
    message:"상체측정을 위한 푸시업 방법을 알려드립니다.",
    correct_posture:"팔의 간격은 어깨너비보다 넓게 벌리지만 팔꿈치의 위치가 가슴보다 아래에 위치하도록 하는 것이 어깨 관절에 부담을 적게 주고 가슴과 삼두근의 자극을 높여줄 수 있습니다.",
    correct_posture_pic:"../assets/img/theme/pushup_movement.gif",
    wrong_posture:"팔을 너무 넓게 벌리며 손에 위치가 어깨 높이에 가까운 경우에 생기는 자세입니다. (어깨를 다칠 수 있습니다.)",
    wrong_posture_pic:"../assets/img/theme/pushup_notgood.gif",
    youtube_url:"https://www.youtube.com/watch?v=-_DUjHxgmWk",
    grid:"../assets/img/theme/exercise_grid/pushup.png"//여기 푸시업으로 바꿔줄것
};

export const situp_content={
    title:"복근측정\n[싯업]",
    message:"복근측정을 위한 싯업 방법을 알려드립니다.",
    correct_posture:"손깍지를 낀 상태로 다리(발)가 움직이지 않도록 하며, 복근의 힘으로 상체를 동글게 말아주며 올라와 줍니다",
    correct_posture_pic:"../assets/img/theme/situp_movement.gif",
    wrong_posture:"중간에 힘이 풀려서 손을 이와 같이 풀지는 말아주세요.측정에 방해가 됩니다.",
    wrong_posture_pic:"../assets/img/theme/situp_notgood.gif",
    youtube_url:"https://www.youtube.com/watch?v=0PgmYmjnoM8",
    grid:"../assets/img/theme/exercise_grid/situp.png"//여기 푸시업으로 바꿔줄것
};

export const squat_content={
    title:"하체측정\n[스쿼트]",
    message:"하체측정을 위한 스쿼트 방법을 알려드립니다.",
    correct_posture:"팔은 어깨높이에서 팔꿈치쪽으로 양손을 접어주시거나 , '앞으로 나란히 자세'처럼 쭉 뻗어줍니다. 그리고 양발은 어깨 넓이보다 약간 넓게 벌려서 의자에 앉듯이 내려갔다가 다시 일어섭니다.",
    correct_posture_pic:"../assets/img/theme/squat_movement.gif",
    wrong_posture:"무릎이 안쪽으로 쏠리게 되면 엉덩이 근육과 허벅지근육에 불균형을 초래하여 무릎에 통증이 발생할 수 있습니다.무릎과 발은 동일선상에 위치할 수 있도록 합니다.",
    wrong_posture_pic:"../assets/img/theme/squat_notgood.png",
    youtube_url:"https://www.youtube.com/watch?v=vQNFiMi0m9M",
    grid:"../assets/img/theme/exercise_grid/squat_edit.png"//여기 푸시업으로 바꿔줄것
};



//각 운동별 설명 및 이미지url 상수로 모아둠
//여기는 그냥 정해져있는 값들이라 상수로 만들어둠
//가슴
export const bench_press={
    name:"벤치프레스",
    image_url:"../assets/img/theme/exercise_gif/benchpress.gif",
    instruction:"벤치프레스는 대표적인 3대운동 중 하나로서 대흉근,삼각근,상완삼두근의 종합적인 참여를 통해 균형있는 상체를 만들어주는 운동입니다",
    musclePart:"대흉근+삼각근+상완삼두근",
    part:"가슴",
    eng_name:"bench_press",
    eng_part:"chest",
    unit_kg:5,
    break_time:100,
    wrong_pose_1:"1.팔을 쫙 폈을 때 어깨와 수직이 안 된 경우",
    wrong_pose_2:"2.팔을 쫙 펼 때와 굽힐 때에 바의 양쪽 균형이 어긋난 경우",
    grid:"../assets/img/theme/exercise_grid/bench_press.png"//여기 푸시업으로 바꿔줄것
}

export const incline_press={
    name:"인클라인프레스",
    image_url:"../assets/img/theme/exercise_gif/inclinepress.gif",
    instruction:"플랫벤치가 아닌 45도 정도 세워진 벤치에서 실시하여 가슴 상부 근육을 좀 더 집중적으로 발달시키는 운동입니다.",
    musclePart:"가슴상부근+상부대흉근",
    part:"가슴",
    eng_name:"incline_press",
    eng_part:"chest",
    unit_kg:5,
    break_time:100,
    wrong_pose_1:"1.팔꿈치가 90도 이상 너무 벌어진 경우",
    wrong_pose_2:"2.팔꿈치를 너무 몸에 붙인 경우",
    grid:"../assets/img/theme/exercise_grid/incline_press.png"//여기 푸시업으로 바꿔줄것
}

export const pec_dec_fly={
    name:"팩덱플라이",
    image_url:"../assets/img/theme/exercise_gif/pecdecfly.gif",
    instruction:"팩덱플라이는 왼쪽과 오른쪽 가슴이 만나는 중앙부분을 발달시키는 운동으로서 가슴중앙의 근육분리와 함께 벌어진 가슴을 모아주는 운동입니다.",
    musclePart:"대흉근",
    part:"가슴",
    eng_name:"pec_dec_fly",
    eng_part:"chest",
    unit_kg:5,//파운드
    break_time:90,
    wrong_pose_1:"1.안쪽으로 접을 때 어깨가 올라가서 승모근을 이용하는 경우",
    wrong_pose_2:"2. 손과 어깨가 너무 수직이 된 경우 (어깨에 부하 가능성)"
}

//등
export const lat_pull_down={
    name:"렛풀다운",
    image_url:"../assets/img/theme/exercise_gif/latpulldown.gif",
    instruction:"턱걸이와 유사한 기능을 가진 수직 당기기 머신 운동으로 등의 광배근을 길러주는 운동입니다",
    musclePart:"광배근+전완근+이두근",
    part:"등",
    eng_name:"lat_pull_down",
    eng_part:"back",
    unit_kg:5,//파운드
    break_time:90,
    wrong_pose_1:"1.팔을 끝까지 최대한 펴서 광배근을 이용해야 하는데 그렇지 않은 경우 (팔을 펼 때 끝까지 일직선으로 펴지 않은 경우)",
    wrong_pose_2:"2.내릴 때 끝까지 가슴까지 내리지 않은 경우 (손 위치와 가슴 위치가 최대한 일직선으로)"
}

export const seated_row={
    name:"시티드로우",
    image_url:"../assets/img/theme/exercise_gif/seatedrow.gif",
    instruction:"시티드 로우는 주로 광배근의 아래 부분을 발달시키는 데 유용한 운동으로, 초보자들도 할 수 있는 가장 기본이 되는 등 운동입니다.",
    musclePart:"광배근+승모근+능형근",
    part:"등",
    eng_name:"seated_row",
    eng_part:"back",
    unit_kg:5,//파운드
    break_time:90,
    wrong_pose_1:"1.팔꿈치가 몸에서 많이 떨어진 경우",
    wrong_pose_2:"2.가슴이 머신에 떨어진 경우"
}

export const barbell_row={
    name:"바벨로우",
    image_url:"../assets/img/theme/exercise_gif/barbellrow.gif",
    instruction:"바벨 로우는 바벨을 사용하여 다양한 등근육을 타겟으로 하는 운동으로, 특히 능형근을 공략하기 위한 대표적인 운동입니다",
    musclePart:"광배근+승모근",
    part:"등",
    eng_name:"barbell_row",
    eng_part:"back",
    unit_kg:1,
    break_time:90,
    wrong_pose_1:"1.허리를 덜 굽힌 경우",
    wrong_pose_2:"2.팔을 끝까지 올리지 않고 덜 올린경우"
}
//어깨
export const dumbbell_shoulder_press={
    name:"덤벨숄더프레스",
    image_url:"../assets/img/theme/exercise_gif/DumbellShoulderPress.gif",
    instruction:"덤벨 숄더 프레스는 보통 전면 삼각근을 발달시키는 데 좋은 운동으로, 팔의 위치에 따라서는 전면과 측면 삼각근 모두에 자극을 줄 수 있는 운동입니다",
    musclePart:"전면삼각근+측면삼각근",
    part:"어깨",
    eng_name:"dumbbell_shoulder_press",
    eng_part:"shoulder",
    unit_kg:1,
    break_time:100,
    wrong_pose_1:"1.어깨와 팔이 일자로 평행하게 밀어야 한다",
    wrong_pose_2:"2.팔꿈치가 수직이 될 때까지만 내린다"
}

export const side_lateral_raise={
    name:"사이드레터럴레이즈",
    image_url:"../assets/img/theme/exercise_gif/sidelateralraise.gif",
    instruction:"사이드 레터럴 레이즈는 측면 삼각근을 단련하는 운동으로 양손에 덤벨을 들고 실시하는 것이 기본입니다",
    musclePart:"측면삼각근",
    part:"어깨",
    eng_name:"side_lateral_raise",
    eng_part:"shoulder",
    unit_kg:1,
    break_time:40,
    wrong_pose_1:"1.팔을 너무 높게 올리는 경우 (90도 이상) – 가동범위는 90도보다 약간 낮게",
    wrong_pose_2:"2.어깨와 팔을 제외한 상체가 움직여 반동을 이용하는 경우",
    grid:"../assets/img/theme/exercise_grid/side_lateral_raise.png"
}

export const reverse_pec_dec_fly={
    name:"리버스팩덱플라이",
    image_url:"../assets/img/theme/exercise_gif/reverse_pec_dec_fly.gif",
    instruction:"리버스 펙덱 플라이는 어깨 중에서도 후면 삼각근을 발달시키는 데 좋은 운동으로, 현대인들의 문제 중 하나인 거북목 교정이나 자세 교정에도 효과적인 운동입니다",
    musclePart:"후면삼각근",
    part:"어깨",
    eng_name:"reverse_pec_dec_fly",
    eng_part:"shoulder",
    unit_kg:1,//아직 미정
    break_time:40,
    wrong_pose_1:"1.어깨가 올라간 경우",
    wrong_pose_2:"2.팔꿈치가 과하게 굽어진 경우"
}


//삼두
export const cable_push_down={
    name:"케이블푸시다운",
    image_url:"../assets/img/theme/exercise_gif/cablepushdown.gif",
    instruction:"케이블 푸시 다운은 초보자들도 쉽게 할 수 있는 삼두 운동 중 하나로, 일자바나 이지바로 할 경우에는 안정적인 고중량 운동이 가능하여 근비대를 목적으로 할 때 좋고, 로프로 할 경우에는 삼두근을 비틀어 외측부의 수축을 줄 수 있습니다",
    musclePart:"삼두근 외측부",
    part:"삼두",
    eng_name:"cable_push_down",
    eng_part:"tricep",
    unit_kg:1,//아직 미정
    break_time:40,
    wrong_pose_1:"1.몸이 너무 위로 일어난 경우",
    wrong_pose_2:"2.팔꿈치를 올릴 때는 최대 90도까지만 올려야 하는데 더 많이 올린 경우"

}

export const lying_triceps_extension={
    name:"라잉트라이셉스익스텐션",
    image_url:"../assets/img/theme/exercise_gif/lying_triceps_extension.gif",
    instruction:"라잉 트라이셉스 익스텐션은 대표적인 삼두 운동으로, 삼두 중에서 가장 큰 근육인 장두를 발달시키는 데 도움이 되는 운동입니다",
    musclePart:"삼두중 장두",
    part:"삼두",
    eng_name:"lying_triceps_extension",
    eng_part:"tricep",
    unit_kg:1,
    break_time:40,
    wrong_pose_1:"1.팔을 과도하게 벌린 경우",
    wrong_pose_2:"2.팔꿈치가 고립되지 않고 팔꿈치 위치가 움직이는 경우"
}

export const dumbbell_kickback={
    name:"덤벨킥백",
    image_url:"../assets/img/theme/exercise_gif/dumbell_kick_back.gif",
    instruction:"덤벨 킥백은 외측두, 내측두, 장두 이렇게 세 부분으로 나누어지는 팔의 뒷부분인 삼두근을 키우는 데 효과적인 운동입니다",
    musclePart:"외측두+내측두+장두",
    part:"삼두",
    eng_name:"dumbbell_kickback",
    eng_part:"tricep",
    unit_kg:1,
    break_time:40,
    wrong_pose_1:"1.팔꿈치가 고정되지 않고 움직이는 경우",
    wrong_pose_2:"2.상체가 너무 올라온 경우"
}
//이두
export const easy_bar_curl={
    name:"이지바 컬",
    image_url:"../assets/img/theme/exercise_gif/ezbarcurl.gif",
    instruction:"이지바 컬은 이두근을 위한 운동으로 E와 Z가 합쳐진 모양새를 가진 바인 EZ바를 이용하여 하는 운동입니다",
    musclePart:"이두근",
    part:"이두",
    eng_name:"easy_bar_curl",
    eng_part:"bicep",
    unit_kg:1,
    break_time:40,
    wrong_pose_1:"1.팔이 상체에서 떨어진 경우",
    wrong_pose_2:"2.팔꿈치가 고정되지 않고 움직이는 경우"
}

export const arm_curl={
    name:"암컬",
    image_url:"../assets/img/theme/exercise_gif/armcurl.webp",
    instruction:"암 컬은 상완근과 상완 이두근의 바깥쪽을 단련할 수 있는 운동입니다",
    musclePart:"상완근+상완이두근",
    part:"이두",
    eng_name:"arm_curl",
    eng_part:"bicep",
    unit_kg:1,
    break_time:40,
    wrong_pose_1:"1.손을 너무 좁게 잡은 경우",
    wrong_pose_2:"2.손을 너무 넓게 잡아 상체에서 손이 너무 많이 떨어진 경우"
}

export const hammer_curl={
    name:"해머컬",
    image_url:"../assets/img/theme/exercise_gif/hammercurl.gif",
    instruction:"해머 컬은 두 손바닥이 마주보게 덤벨을 잡고 들어올렸다가 내리면 되는 이두 운동으로 이두뿐만 아니라 전완근과 상완근을 발달시킬 수 있는 운동입니다",
    musclePart:"이두+전완근+상완근",
    part:"이두",
    eng_name:"hammer_curl",
    eng_part:"bicep",
    unit_kg:1,
    break_time:40,
    wrong_pose_1:"1.어깨가 올라간 경우",
    wrong_pose_2:"2.몸의 반동을 이용해서 올리는 경우"
}



//복근
export const crunch={
    name:"크런치",
    image_url:"../assets/img/theme/exercise_gif/crunches2.gif",
    instruction:"크런치는 윗몸 일으키기의 변형 동작으로 끝까지 눕거나 올라가지 않고 가동범위를 축소하여 복근 중 상부를 강화하는 운동입니다",
    musclePart:"복근상부",
    part:"복근",
    eng_name:"crunch",
    eng_part:"abs",
    unit_kg:0,//필요없음,
    break_time:90,
    wrong_pose_1:"1.엉덩이가 들썩들썩 하는 경우 (반동 사용)",
    wrong_pose_2:"2.다리 사이가 너무 벌어지는 경우"
}

export const seated_knees_up={
    name:"시티드니업",
    image_url:"../assets/img/theme/exercise_gif/seatedkneeup.gif",
    instruction:"시티드 니 업은 상복근과 하복근을 동시에 단련시킬 수 있으며, 부가적으로 복근 옆 복사근과 허벅지 근육도 발달 시키는 데에 용이한 운동입니다",
    musclePart:"상복근+하복근+복사근+허벅지",
    part:"복근",
    eng_name:"seated_knees_up",
    eng_part:"abs",
    unit_kg:0,//필요없음
    break_time:90,
    wrong_pose_1:"1.허리를 너무 꼿꼿이 핀 경우 (상체를 조금 구부려야 허리에 무리가 안 가고 복부 근육을 온전히 쓸 수 있음)",
    wrong_pose_2:"2.팔을 너무 짧게 앞에서 잡은 경우 (최대한 뒤에서 잡아야 상체가 뒤로 누워져서 복근을 더 많이 쓸 수 있음)",
    grid:"../assets/img/theme/exercise_grid/seated_knees_up.png"
}

export const plank={
    name:"플랭크",
    image_url:"../assets/img/theme/exercise_gif/plank.gif",
    instruction:"플랭크는 효과적인 코어와 복근 운동으로, 맨손 운동의 일종으로 허리 재활에도 효과적인 운동입니다",
    musclePart:"코어+복근",
    part:"복근",
    eng_name:"plank",
    eng_part:"abs",
    unit_kg:0,//필요없음
    break_time:90,
    wrong_pose_1:"1.어깨가 너무 올라간 경우 (어깨와 승모근에 힘이 들어감)",
    wrong_pose_2:"2.엉덩이가 너무 내려간 경우"
}
//하체

export const squat={
    name:"스쿼트",
    image_url:"../assets/img/theme/exercise_gif/squat.gif",
    instruction:"스쿼트는 하체 근력 발달에 좋은 대표적인 운동으로 흔히 3대 운동이라 불리는 운동 중 하나이며, 다리와 엉덩이를 단단하게 만들어주고 혈액순환의 개선과 건강한 관절과 뼈를 유지하는 데도 도움이 되는 운동입니다",
    musclePart:"대퇴사두근+내전근+척추기립근",
    part:"하체",
    eng_name:"squat",
    eng_part:"leg",
    unit_kg:5,
    break_time:100,
    wrong_pose_1:"1.앉을때 무릎이 앞으로 나가는 경우",
    wrong_pose_2:"2.앉을때 너무 엉덩이만 뒤로 빼서 허리가 너무 숙여져 있는 경우"
}

export const leg_press={
    name:"레그프레스",
    image_url:"../assets/img/theme/exercise_gif/legpress.gif",
    instruction:"레그 프레스는 머신을 사용하여 고중량의 무게를 밀어내는 하체 운동으로, 발을 발판 위로 놔둘수록 다리 후면, 아래로 놔둘수록 다리 전면, 발을 벌리면 다리 안쪽, 발을 좁히면 다리 바깥쪽에 자극이 많이 가는 운동입니다",
    musclePart:"대둔근",
    part:"하체",
    eng_name:"leg_press",
    eng_part:"leg",
    unit_kg:5,//아직 미정
    break_time:100,
    wrong_pose_1:"1.무릎이 발바닥보다 안쪽으로 좁혀지는 경우",
    wrong_pose_2:"2.허벅지가 양쪽으로 벌어지는 경우"
}

export const leg_extension={
    name:"레그익스텐션",
    image_url:"../assets/img/theme/exercise_gif/legextension.gif",
    instruction:"레그 익스텐션은 대퇴사두를 집중적으로 단련시킬 수 있는 단순 관절 운동으로, 단단한 앞 허벅지를 만드는 데에 효과적인 운동입니다",
    musclePart:"대퇴사두근",
    part:"하체",
    eng_name:"leg_extension",
    eng_part:"leg",
    unit_kg:5,//아직 미정
    break_time:90,
    wrong_pose_1:"1.무릎이 양쪽으로 과도하게 벌어지는 경우",
    wrong_pose_2:"2.엉덩이, 등이 머신에 붙지 않은 경우"
}


export const exercise_classfication={
    가슴:[bench_press,incline_press,pec_dec_fly],
    등:[lat_pull_down,seated_row,barbell_row],
    어깨:[dumbbell_shoulder_press,side_lateral_raise,reverse_pec_dec_fly],
    삼두:[cable_push_down,lying_triceps_extension,dumbbell_kickback],
    이두:[easy_bar_curl,arm_curl,hammer_curl],
    복근:[crunch,seated_knees_up,plank],
    하체:[squat,leg_press,leg_extension]
}