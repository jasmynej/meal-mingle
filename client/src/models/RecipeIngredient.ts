import Ingredient from "./Ingredient";

interface RecipeIngredientInt {
    id:String
    amount:Number
    unit:String
    direction:String
    ingredient:Ingredient
}

class RecipeIngredient implements RecipeIngredientInt {
    amount: Number;
    direction: String;
    id: String;
    ingredient: Ingredient;
    unit: String;

    constructor(id:String,amount:Number,unit:String,direction:String,ingredient:Ingredient) {
        this.id = id;
        this.amount = amount;
        this.unit = unit;
        this.direction = direction;
        this.ingredient = ingredient;

    }

}

export default RecipeIngredient;