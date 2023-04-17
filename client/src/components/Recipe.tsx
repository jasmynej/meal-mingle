import Recipe from "../models/Recipe";
import Image from "./Image";

function RecipeCard ({recipe}:{recipe:Recipe}): JSX.Element{


    return (
        <div>
            <div>
                <Image image={recipe.recipeImages[0]}/>
            </div>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <div>
                {recipe.ingredients.map((recipe_ingredient)=>{

                    return (
                        <div>
                           <p>ingredient goes here</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RecipeCard;