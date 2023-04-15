import RecipeIngredient from "./RecipeIngredient";

interface RecipeInt {
    id:String
    title:String
    description:String
    userId:String
    ingredients:RecipeIngredient[]
}
class Recipe implements RecipeInt{
    description: String;
    id: String;
    title: String;
    userId: String;
    ingredients: RecipeIngredient[];
    constructor(id:String,title:String,userId:String,description:String,ingredients:RecipeIngredient[]) {
        this.id = id
        this.title = title
        this.userId = userId
        this.description = description
        this.ingredients = ingredients;
    }

    

}
export default Recipe;