export class Exercise{
    constructor(last_record,recommend,Exercise_Info){//여기서는 api값들로 받은 것들을 넣어주자+상수값
        this.name=Exercise_Info.name;
        this.last_record=last_record;
        this.recommend=recommend;
        this.instruction=Exercise_Info.instruction;
        this.image_url=Exercise_Info.image_url;
        this.musclePart=Exercise_Info.musclePart;
        this.part=Exercise_Info.part
    }

    get name(){
        return this.name;
    }

    get last_record(){
        return this.last_record;
    }

    get recommend_kg(){
        return this.recommend_kg;
    }

    get instruction(){
        return this.instruction;
    }
}


//여기는 체력측정부분의 운동들을 상수로 담아놓음
export const pushup={
    name:"푸시업",
    image_url:"../assets/img/theme/pushup_animated.gif",
    instruction:"푸시업은 상체부분에 대표적인 근력운동으로서 상체근육의 근발달정도를 가늠할 때 사용합니다"
}

export const situp={
    name:"싯업",
    image_url:"../assets/img/theme/Situp_animated.gif",
    instruction:"싯업은 대표적인 복부운동으로서 복부근육의 근발달정도를 가늠할 때 사용합니다"
}

export const squat={
    name:"스쿼트",
    image_url:"../assets/img/theme/squat_animated.gif",
    instruction:"스쿼트는 하체부분에 대표적인 근력운동으로서 하체근육의 근발달정도를 가늠할 때 사용합니다"
}


//각 운동별 설명 및 이미지url 상수로 모아둠
//여기는 그냥 정해져있는 값들이라 상수로 만들어둠
//가슴
export const BenchPress={
    name:"벤치프레스",
    image_url:"../assets/img/theme/benchPress.gif",
    instruction:"벤치프레스는 대표적인 3대운동 중 하나로서 대흉근,삼각근,상완삼두근의 종합적인 참여를 통해 균형있는 상체를 만들어주는 운동입니다",
    musclePart:"대흉근+삼각근+상완삼두근",
    part:"가슴"
}

export const InclinedBenchPress={
    name:"인클라인프레스",
    image_url:"../assets/img/theme/InclinedPress.gif",
    instruction:"플랫벤치가 아닌 45정도 세워진 벤치에서 실시하여 가슴 상부 근육을 좀 더 집중적으로 발달시키는 운동입니다.",
    musclePart:"가슴상부근+상부대흉근",
    part:"가슴"
}

export const DumbbelFly={
    name:"덤벨플라이",
    image_url:"../assets/img/theme/DumbbelFly.gif",
    instruction:"덤벨플라이는 왼쪽과 오른쪽 가슴이 만나느 중앙부분을 발달시키는 운동으로서 가슴중앙의 근육분리와 함께 벌어진 가슴을 모아주는 운동입니다.",
    musclePart:"대흉근",
    part:"가슴"
}

//등
export const LatPullDown={
    name:"렛풀다운",
    image_url:"../assets/img/theme/LatPullDown.gif",
    instruction:"턱걸이와 유사한 기능을 가진 수직 당기기 머신 운동으로 등의 광배근을 길러주는 운동입니다",
    musclePart:"광배근+전완근+이두근",
    part:"등"
}

//어깨

//삼두
export const CablePushDown={
    name:"케이블푸시다운",
    image_url:"../assets/img/theme/CablePushDown.gif",
    instruction:"",
    musclePart:"",
}

export const LyingTricepsExtension={
    name:"라잉트라이셉스익스텐션",
    image_url:"",
    instruction:"",
    musclePart:"",
}

export const DumbbellKickBack={
    name:"덤벨킥백",
    image_url:"",
    instruction:"",
    musclePart:"",
}
//이두

//복근
export const Crunch={
    name:"크런치",
    image_url:"",
    instruction:"",
    musclePart:"",
}

export const SeatedKneeUp={
    name:"싯티드니업",
    image_url:"",
    instruction:"",
    musclePart:"",
}

export const Planke={
    name:"플랭크",
    image_url:"",
    instruction:"",
    musclePart:"",
}
//하체