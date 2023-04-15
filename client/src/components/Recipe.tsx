import Recipe from "../models/Recipe";

function RecipeCard ({recipe}:{recipe:Recipe}): JSX.Element{
    return (
        <div>
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