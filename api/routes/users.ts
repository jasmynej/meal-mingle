import {Request, Response, Router} from "express";
import {PrismaClient, User} from '@prisma/client'

const userRouter = Router()
const prisma = new PrismaClient()

userRouter.get("/",async (req:Request,res:Response)=>{
    const allUsers: User[] =await prisma.user.findMany({})
    res.json(allUsers)
})

userRouter.get("/:id",async (req:Request,res:Response)=>{
    const user: User | null = await prisma.user.findFirst({
        where:{
            id:req.params.id
        },
        include:{
            recipes:true,
            comments:true
        }
    })
    res.json(user)
})

export default userRouter;