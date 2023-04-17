import {Request,Router,Response} from "express";
import {PrismaClient} from '@prisma/client'

const baseRouter = Router()
const prisma = new PrismaClient();

baseRouter.get("/categories",async(req:Request,res:Response)=>{
    const categories = await prisma.category.findMany({})
    res.json(categories)
})

export default baseRouter;