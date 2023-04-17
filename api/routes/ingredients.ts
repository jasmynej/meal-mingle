import {Request,Response,Router} from "express"
import {Ingredient, PrismaClient} from "@prisma/client";

const ingredientRouter:Router = Router()
const prisma:PrismaClient = new PrismaClient()

ingredientRouter.get("/",async (req:Request,res:Response)=>{
    const ingredients: Ingredient[] = await prisma.ingredient.findMany({})
    res.json(ingredients)
})

ingredientRouter.get("/:id",async (req:Request,res:Response)=>{

    const ingredient: Ingredient | null = await prisma.ingredient.findFirst({
        where:{
            id:req.params.id
        }
    })
    res.json(ingredient)
})
export default ingredientRouter;