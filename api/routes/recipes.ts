import {Request,Router,Response} from "express";
import {PrismaClient} from '@prisma/client'

const recipeRouter:Router = Router()
const prisma:PrismaClient = new PrismaClient()

recipeRouter.get("/",async (req:Request,res:Response)=>{
    const recipes = await prisma.recipe.findMany({
        select:{
            id:true,
            title:true,
            description:true,
            user: {
                select: {
                    id: true,
                    username: true
                }
            }  ,
            images:true,
            categories:{
                select: {
                    category:true
                }
            },

            userId:false

        }

    })

    res.json(recipes)
})

recipeRouter.get("/:id",async (req:Request,res:Response)=>{
    const recipe = await prisma.recipe.findFirst(
        {
            where:{
                id:req.params.id
            },
            select:{
                id:true,
                title:true,
                description:true,
                user:{
                    select:{
                        id:true,
                        username:true
                    }
                },
                images:true,
                ingredients:{
                    select:{
                        ingredientId:true,
                        amount:true,
                        unit:true,
                        direction:true,
                        ingredient:true
                    }
                },
                categories:{
                    select: {
                        category:true
                    }
                },
                userId:false

            }
        }
    )

    res.json(recipe)
})
recipeRouter.get("/category",async (req:Request,res:Response)=>{
    const categories = await prisma.category.findMany({})
    res.json(categories)


})

export default recipeRouter;