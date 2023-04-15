import {Request, Response, Router} from "express";
import { PrismaClient } from '@prisma/client'

const userRouter = Router()
const prisma = new PrismaClient()

userRouter.get("/",async (req:Request,res:Response)=>{
    const allUsers =await prisma.user.findMany({
        include:{
            recipes:true
        }
    })
    res.json(allUsers)
})

export default userRouter;