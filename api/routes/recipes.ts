import {Request,Router,Response} from "express";
import {PrismaClient} from '@prisma/client'

const recipeRouter:Router = Router()
const prisma:PrismaClient = new PrismaClient()

recipeRouter.get("/",async (req:Request,res:Response)=>{
    const recipes = await prisma.recipe.findMany({
        include:{
            ingredients:{
                include:{
                    ingredient:true
                }
            },
            categories:{
                include: {
                    category:true
                }
            },
            user:true,
            recipeImages:true
        }
    })

    res.json(recipes)
})

recipeRouter.get("/category",async (req:Request,res:Response)=>{
    const categories = await prisma.category.findMany({})
    res.json(categories)
})

export default recipeRouter;