import {Request, Response, Router} from "express";
import {PrismaClient, User} from '@prisma/client'
import {S3Client} from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3"
const userRouter = Router()
const prisma = new PrismaClient()

const s3Client = new S3Client({
    region:"us-east-1",
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_ID ? process.env.AWS_ACCESS_ID:"",
        secretAccessKey:process.env.AWS_SECRET_KEY ? process.env.AWS_SECRET_KEY:""
    }
})

const s3Storage = multerS3({
    s3:s3Client,
    bucket:"meal-mingle",
    key: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); //use Date.now() for unique file keys
    }

})

const s3Upload = multer({
    storage:s3Storage
})


userRouter.get("/",async (req:Request,res:Response)=>{
    const allUsers: User[] =await prisma.user.findMany({

    })
    res.json(allUsers)
})

userRouter.get("/:id",async (req:Request,res:Response)=>{
    const user: User | null = await prisma.user.findFirst({
        where:{
            id:req.params.id
        },
        include:{
            recipes:true,
            comments:true,
        }
    })
    res.json(user)
})

userRouter.post("/sign-up",s3Upload.single("profile-img"),async (req:Request,res:Response)=>{
    const form = req.body
    console.log(req.file)
    console.log(form)
    // @ts-ignore
    const user = await prisma.user.create({
        data:{
            username:form.username,
            email:form.email,
            password:form.password,
            profilePic:{
                // @ts-ignore
                fileName:req.file?.key,
                // @ts-ignore
                s3Link:req.file?.location
            }
        }
    })
    res.json(user)
})

userRouter.post("/sign-in",async (req:Request,res:Response)=>{
    const form = req.body;
    const user = await prisma.user.findFirst({
        where:{
            username:form.username
        }
    })
    if(user===null){
        res.json({
            msg:"User does not exist",
            success:false
        })
    }
    else {
        if(user.password === form.password){
            res.json({
                user:user,
                success:true
            })
        }
        else {
            res.json({
                msg:"Incorrect Password",
                success:false
            })
        }
    }
})
export default userRouter;