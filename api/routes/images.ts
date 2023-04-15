import * as dotenv from 'dotenv'
dotenv.config()
import {Request,Router,Response} from "express";
import {S3Client, ListObjectsCommand} from "@aws-sdk/client-s3";
import multerS3 from "multer-s3"
import multer from "multer";


const imageRouter = Router()

const s3_client = new S3Client({
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_ID ? process.env.AWS_ACCESS_ID:"" ,
        secretAccessKey:process.env.AWS_SECRET_KEY ? process.env.AWS_SECRET_KEY:""
    },
    region:"us-east-1"}
)
const s3Storage = multerS3({
    s3:s3_client,
    bucket:"meal-mingle",
    key: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname); //use Date.now() for unique file keys
    }

})
const upload = multer({
    storage:s3Storage,

})
imageRouter.get("/s3-images",async (req:Request,res:Response)=>{
    const listObjects = new ListObjectsCommand({
        Bucket:"meal-mingle"
    })
    const objs = await s3_client.send(listObjects)
    res.json(objs.Contents)

})
imageRouter.get("/:key",async (req:Request,res:Response)=>{
    console.log(`${process.env.AWS_S3_URL}${req.params.key}`)
   res.json({url:`${process.env.AWS_S3_URL}${req.params.key}`})

})
imageRouter.post("/upload",upload.array('imgs',5),(req:Request,res:Response)=>{

    res.send("uploaded")
})
export default imageRouter;