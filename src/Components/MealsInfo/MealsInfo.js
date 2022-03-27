export class Meal{
    constructor(Info_from_api,how_many_people){
        this.Info_from_api=Info_from_api;
        this.how_many_people=how_many_people;
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

}



export const Example_food={
    name:"들깻잎",
    img_url:"../assets/img/theme/profile-cover.jpg",
    kcal:47,
    carbo:5,
    protein:5,
    fat:5
}