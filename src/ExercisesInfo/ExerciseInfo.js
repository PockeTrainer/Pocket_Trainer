export class Exercise{
    constructor(last_record,recommend,Exercise_Info){//여기서는 api값들로 받은 것들을 넣어주자+상수값
        this.name=Exercise_Info.name;
        this.last_record=last_record,
        this.recommend=recommend,
        this.instruction=Exercise_Info.instruction;
        this.image_url=Exercise_Info.image_url;
        this.musclePart=Exercise_Info.musclePart
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

//각 운동별 설명 및 이미지url 상수로 모아둠
//여기는 그냥 정해져있는 값들이라 상수로 만들어둠
//가슴
export const BenchPress={
    name:"벤치프레스",
    image_url:"../assets/img/theme/benchPress.gif",
    instruction:"벤치프레스는 대표적인 3대운동 중 하나로서 대흉근,삼각근,상완삼두근의 종합적인 참여를 통해 균형있는 상체를 만들어주는 운동입니다",
    musclePart:"대흉근+삼각근+상완삼두근"
}

export const InclinedBenchPress={
    name:"인클라인프레스",
    image_url:"../assets/img/theme/InclinedPress.gif",
    instruction:"플랫벤치가 아닌 45정도 세워진 벤치에서 실시하여 가슴 상부 근육을 좀 더 집중적으로 발달시키는 운동입니다.",
    musclePart:"가슴상부근+상부대흉근"
}

export const Dips={
    name:"딥스",
    image_url="../assets/img/theme/Dips.gif",
    instruction:"딥스는 평행봉 체조에서 가져온 운동으로 평행봉 사이에서 상체 근육을 이용하여 몸을 위아래로 움직이는 운동입니다",
    musclePart:"가슴하부근+삼두근+전면삼각근"
}

//등
export const LatPullDown={
    name:"렛풀다운",
    image_url="../assets/img/theme/LatPullDown.gif",
    instruction:"턱걸이와 유사한 기능을 가진 수직 당기기 머신 운동으로 등의 광배근을 길러주는 운동입니다",
    musclePart:"광배근+전완근+이두근"
}