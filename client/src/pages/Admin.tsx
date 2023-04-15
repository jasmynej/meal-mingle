import axios from "axios";
import {useState,useEffect} from "react";
import Recipe from "../models/Recipe";
import RecipeCard from "../components/Recipe";


function Admin() : JSX.Element {
    const [recipes,setRecipes] = useState<Recipe[]>([])
    const getRecipes = () => {
        axios.get("http://localhost:3100/api/recipes")
            .then(function (response){
                setRecipes(response.data)
            })
            .catch(err => console.log(err))
    }


    useEffect(()=>{
        getRecipes()
    },[])
    return (
        <div>

            {recipes.map((recipe)=>{
                return(
                    <RecipeCard recipe={recipe}/>
                )
            })}
        </div>
    )
}

export default Admin;