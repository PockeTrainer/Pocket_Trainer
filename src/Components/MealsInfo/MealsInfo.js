export class Meal{
    constructor(Info_from_api,how_many_people,gram,when_to_eat){
        this.Info_from_api=Info_from_api;
        this.how_many_people=how_many_people;
        this.gram=gram;
        this.when_to_eat=when_to_eat;
    }

    set Info_from_api(Info_from_api){
        this._Info_from_api=Info_from_api
    }
    get Info_from_api(){
        return this._Info_from_api;
    }

    set how_many_people(how_many_people){
        this._how_many_people=how_many_people
    }

    get how_many_people(){
        return this._how_many_people
    }

    set gram(gram){
        this._gram=gram;
    }
    get gram(){
        return this._gram;
    }

    set when_to_eat(when_to_eat){
        this._when_to_eat=when_to_eat
    }
    get when_to_eat(){
        return this._when_to_eat;
    }
}



export const Example_food={
    name:"들깻잎",
    img_url:"../assets/img/theme/foods/profile-cover.jpg",
    kcal:47,
    carbo:5,
    protein:5,
    fat:5
}


//탄수화물
export const rice={
    name:"쌀밥",
    image_url:"../assets/img/theme/foods/rice.jfif",
    carbo:67.32,
    protein:5.61,
    province:0.85,
    kcal:310
}

export const apple={
    name:"사과",
    image_url:"../assets/img/theme/foods/apple.jfif",
    carbo:14.36,
    protein:0.2,
    province:0.03,
    kcal:57
}

export const sweetpotato={
    name:"군고구마",
    image_url:"../assets/img/theme/foods/sweetpotato.jfif",
    carbo:31.3,
    protein:1.5,
    province:0.2,
    kcal:124
}

export const cherrytomato={
    name:"방울토마토",
    image_url:"../assets/img/theme/foods/cherrytomato.jfif",
    carbo:0.4,
    protein:0.1,
    province:0.0,
    kcal:2
}

export const brownrice={
    name:"현미밥",
    image_url:"../assets/img/theme/foods/brownrice.jfif",
    carbo:68.95,
    protein:6.3,
    province:1.53,
    kcal:321
}

export const banana={
    name:"바나나",
    image_url:"../assets/img/theme/foods/banana.jfif",
    carbo:21.9,
    protein:1.1,
    province:0.1,
    kcal:93
}


//단백질
export const chickenBreast={
    name:"닭가슴살",
    image_url:"../assets/img/theme/foods/chickenBreast.jfif",
    carbo:0,
    protein:22.97,
    province:0.97,
    kcal:107
}

export const egg={
    name:"삶은달걀",
    image_url:"../assets/img/theme/foods/egg.jfif",
    carbo:1.095,
    protein:6.97,
    province:3.985,
    kcal:68
}

export const tuna={
    name:"참치",
    image_url:"../assets/img/theme/foods/tuna.jfif",
    carbo:2,
    protein:9.8,
    province:6.3,
    kcal:105
}

export const tofu={
    name:"두부",
    image_url:"../assets/img/theme/foods/tofu.jfif",
    carbo:0.8,
    protein:7.6,
    province:5.9,
    kcal:88
}

export const mackerel={
    name:"고등어구이",
    image_url:'../assets/img/theme/foods/mackerel.jfif',
    carbo:1.85,
    protein:59.24,
    province:47.18,
    kcal:667
}

export const beef={
    name:"소등심",
    image_url:"../assets/img/theme/foods/beef.jfif",
    carbo:0,
    protein:45.4,
    province:28.3,
    kcal:436
}

//지방
export const almond={
    name:"아몬드",
    image_url:"../assets/img/theme/foods/almond.jfif",
    carbo:0.24,
    protein:0.26,
    province:0.61,
    kcal:7
}

export const walnut={
    name:"호두",
    image_url:"../assets/img/theme/foods/walnut.jfif",
    carbo:0.55,
    protein:0.61,
    province:2.61,
    kcal:26
}

export const salmon={
    name:"연어스테이크",
    image_url:"../assets/img/theme/foods/salmon.jfif",
    carbo:22.76,
    protein:51.03,
    province:40.25,
    kcal:556
}

export const avocado={
    name:"아보카도",
    image_url:"../assets/img/theme/foods/avocado.jfif",
    carbo:6.2,
    protein:2.5,
    province:18.7,
    kcal:187
}

export const pork={
    name:"삼겹살",
    image_url:"../assets/img/theme/foods/pork.jfif",
    carbo:0,
    protein:22.8,
    province:41.2,
    kcal:460
}

export const macadamia={
    name:"마카다미아",
    image_url:"../assets/img/theme/foods/macadamia.jfif",
    carbo:1.8,
    protein:1.1,
    province:9.8,
    kcal:94
}