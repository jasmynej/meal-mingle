import {Request,Router,Response} from "express";
import {PrismaClient} from '@prisma/client'
import {S3Client} from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3"

const recipeRouter:Router = Router()
const prisma:PrismaClient = new PrismaClient()

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
                directions:true,
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

recipeRouter.post("/create",async (req:Request,res:Response)=>{
    const recipeForm = req.body
    const recipe = await prisma.recipe.create({
        data:{
            title:recipeForm.metadata.title,
            description:recipeForm.metadata.description,
            images:[],
            directions:recipeForm.metadata.directions,
            user:{
                connect:{
                    id:recipeForm.metadata.userId
                }
            },
            ingredients:{
                createMany:{
                    data:recipeForm.ingredients
                }
            },
            categories:{
                createMany:{
                    data:recipeForm.categories
                }
            }
        },
        include:{
            ingredients:true,
            categories:true
        }
    })

    res.json(recipe)
  //
})

recipeRouter.put("/:id/add-images",s3Upload.array("images",4),async (req:Request,res:Response)=>{
    console.log(req.files)
    const recipe = await prisma.recipe.findFirst({
        where:{
            id:req.params.id
        }
    })
    let recipeImages = recipe?.images
    // @ts-ignore
    req.files?.forEach((file)=>{
        let imageObj = {
            fileName:file.originalname,
            s3Link:file.location
        }
       // @ts-ignore
        recipeImages.push(imageObj)
    })
    // @ts-ignore
    const updatedRecipe = await prisma.recipe.update({
        where:{
            id:req.params.id
        },
        data:{
            //@ts-ignore
            images:recipeImages
        }
    })

    res.json(updatedRecipe)
})
recipeRouter.put("/:id/update",async (req:Request,res:Response)=>{
    const update_form = req.body
    const updatedRecipe = await prisma.recipe.update({
        where:{
            id:req.params.id
        },
        data:{
            categories:{
                createMany:{
                    data:update_form.categories
                }
            }
        },
        include:{
            ingredients:true,
            categories:true
        }
    })

    res.json(updatedRecipe)

})

export default recipeRouter;