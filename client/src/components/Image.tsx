import RecipeImage from "../models/RecipeImage";

function Image({image}: {image:RecipeImage}): JSX.Element {

    return (
        <div>
            <img src={`https://meal-mingle.s3.amazonaws.com/${image.fileName}`} alt="recipe image" width="100"/>
        </div>
    )
}

export default Image;