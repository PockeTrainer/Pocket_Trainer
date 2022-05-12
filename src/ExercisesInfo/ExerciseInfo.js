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
        this._muscle_part=muscle_part;
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
    break_time:100
}

export const incline_press={
    name:"인클라인프레스",
    image_url:"../assets/img/theme/exercise_gif/inclinepress.gif",
    instruction:"플랫벤치가 아닌 45정도 세워진 벤치에서 실시하여 가슴 상부 근육을 좀 더 집중적으로 발달시키는 운동입니다.",
    musclePart:"가슴상부근+상부대흉근",
    part:"가슴",
    eng_name:"incline_press",
    eng_part:"chest",
    unit_kg:5,
    break_time:100
}

export const pec_dec_fly={
    name:"팩덱플라이",
    image_url:"../assets/img/theme/exercise_gif/pecdecfly.gif",
    instruction:"팩덱플라이는 왼쪽과 오른쪽 가슴이 만나느 중앙부분을 발달시키는 운동으로서 가슴중앙의 근육분리와 함께 벌어진 가슴을 모아주는 운동입니다.",
    musclePart:"대흉근",
    part:"가슴",
    eng_name:"pec_dec_fly",
    eng_part:"chest",
    unit_kg:5,//파운드
    break_time:90
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
    break_time:90
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
    break_time:90
}

export const barbell_row={
    name:"바벨로우",
    image_url:"../assets/img/theme/exercise_gif/barbellrow.gif",
    instruction:"",
    musclePart:"광배근+승모근",
    part:"등",
    eng_name:"barbell_row",
    eng_part:"back",
    unit_kg:1,
    break_time:90
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
    break_time:100
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
    break_time:40
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
    break_time:40
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
    break_time:40

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
    break_time:40
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
    break_time:40
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
    break_time:40
}

export const arm_curl={
    name:"암컬",
    image_url:"../assets/img/theme/exercise_gif/armcurl.gif",
    instruction:"암 컬은 상완근과 상완 이두근의 바깥쪽을 단련할 수 있는 운동입니다",
    musclePart:"상완근+상완이두근",
    part:"이두",
    eng_name:"arm_curl",
    eng_part:"bicep",
    unit_kg:1,
    break_time:40
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
    break_time:40
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
    break_time:90
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
    break_time:90
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
    break_time:90
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
    break_time:100
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
    break_time:100
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
    break_time:90
}
