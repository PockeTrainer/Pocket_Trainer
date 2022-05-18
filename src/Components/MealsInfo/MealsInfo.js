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
    image_url:"../assets/img/theme/foods/rice.jfif"
}

export const apple={
    name:"사과",
    image_url:"../assets/img/theme/foods/apple.jfif"
}

export const sweetpotato={
    name:"군고구마",
    image_url:"../assets/img/theme/foods/sweetpotato.jfif"
}

export const cherrytomato={
    name:"방울토마토",
    image_url:"../assets/img/theme/foods/cherrytomato.jfif"
}

export const brownrice={
    name:"현미밥",
    image_url:"../assets/img/theme/foods/brownrice.jfif"
}

export const banana={
    name:"바나나",
    image_url:"../assets/img/theme/foods/banana.jfif"
}


//단백질
export const chickenBreast={
    name:"닭가슴살",
    image_url:"../assets/img/theme/foods/chickenBreast.jfif"
}

export const egg={
    name:"삶은달걀",
    image_url:"../assets/img/theme/foods/egg.jfif"
}

export const tuna={
    name:"참치",
    image_url:"../assets/img/theme/foods/tuna.jfif"
}

export const tofu={
    name:"두부",
    image_url:"../assets/img/theme/foods/tofu.jfif"
}

export const mackerel={
    name:"고등어구이",
    image_url:'../assets/img/theme/foods/mackerel.jfif'
}

export const beef={
    name:"소등심",
    image_url:"../assets/img/theme/foods/beef.jfif"
}

//지방
export const almond={
    name:"아몬드",
    image_url:"../assets/img/theme/foods/almond.jfif"
}

export const walnut={
    name:"호두",
    image_url:"../assets/img/theme/foods/walnut.jfif"
}

export const salmon={
    name:"연어스테이크",
    image_url:"../assets/img/theme/foods/salmon.jfif"
}

export const avocado={
    name:"아보카도",
    image_url:"../assets/img/theme/foods/avocado.jfif"
}

export const pork={
    name:"삼겹살",
    image_url:"../assets/img/theme/foods/pork.jfif"
}

export const macadamia={
    name:"마카다미아",
    image_url:"../assets/img/theme/foods/macadamia.jfif"
}