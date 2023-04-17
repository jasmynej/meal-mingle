import RecipeIngredient from "./RecipeIngredient";
import RecipeImage from "./RecipeImage";

interface RecipeInt {
    id:String
    title:String
    description:String
    userId:String
    ingredients:RecipeIngredient[]
    recipeImages:RecipeImage[]
}
class Recipe implements RecipeInt{
    description: String;
    id: String;
    title: String;
    userId: String;
    ingredients: RecipeIngredient[];
    recipeImages: RecipeImage[];
    constructor(id:String,title:String,userId:String,description:String,ingredients:RecipeIngredient[],recipeImages:RecipeImage[]) {
        this.id = id
        this.title = title
        this.userId = userId
        this.description = description
        this.ingredients = ingredients;
        this.recipeImages = recipeImages;
    }

    

    

}
export default Recipe;