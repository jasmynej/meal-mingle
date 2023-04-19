import {Request,Router,Response} from "express";
import {PrismaClient} from '@prisma/client'

const baseRouter = Router()
const prisma = new PrismaClient();

baseRouter.get("/categories",async(req:Request,res:Response)=>{
    const categories = await prisma.category.findMany({})
    res.json(categories)
})

baseRouter.get("/categories/:id",async (req:Request,res:Response)=>{
    const category = await prisma.category.findFirst({
        where:{
            id:req.params.id
        },
        include:{
            recipes:{
                include:{
                    recipe:true
                }
            },
        }
    })
    res.json(category)
})

export default baseRouter;