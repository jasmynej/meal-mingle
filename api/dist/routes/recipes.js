"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const recipeRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const s3Client = new client_s3_1.S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID ? process.env.AWS_ACCESS_ID : "",
        secretAccessKey: process.env.AWS_SECRET_KEY ? process.env.AWS_SECRET_KEY : ""
    }
});
const s3Storage = (0, multer_s3_1.default)({
    s3: s3Client,
    bucket: "meal-mingle",
    key: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); //use Date.now() for unique file keys
    }
});
const s3Upload = (0, multer_1.default)({
    storage: s3Storage
});
recipeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield prisma.recipe.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            images: true,
            categories: {
                select: {
                    category: true
                }
            },
            userId: false
        }
    });
    res.json(recipes);
}));
recipeRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield prisma.recipe.findFirst({
        where: {
            id: req.params.id
        },
        select: {
            id: true,
            title: true,
            description: true,
            directions: true,
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            images: true,
            ingredients: {
                select: {
                    ingredientId: true,
                    amount: true,
                    unit: true,
                    direction: true,
                    ingredient: true
                }
            },
            categories: {
                select: {
                    category: true
                }
            },
            userId: false
        }
    });
    res.json(recipe);
}));
recipeRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeForm = req.body;
    const recipe = yield prisma.recipe.create({
        data: {
            title: recipeForm.metadata.title,
            description: recipeForm.metadata.description,
            images: [],
            directions: recipeForm.metadata.directions,
            user: {
                connect: {
                    id: recipeForm.metadata.userId
                }
            },
            ingredients: {
                createMany: {
                    data: recipeForm.ingredients
                }
            },
            categories: {
                createMany: {
                    data: recipeForm.categories
                }
            }
        },
        include: {
            ingredients: true,
            categories: true
        }
    });
    res.json(recipe);
    //
}));
recipeRouter.put("/:id/add-images", s3Upload.array("images", 4), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.files);
    const recipe = yield prisma.recipe.findFirst({
        where: {
            id: req.params.id
        }
    });
    let recipeImages = recipe === null || recipe === void 0 ? void 0 : recipe.images;
    // @ts-ignore
    (_a = req.files) === null || _a === void 0 ? void 0 : _a.forEach((file) => {
        let imageObj = {
            fileName: file.originalname,
            s3Link: file.location
        };
        // @ts-ignore
        recipeImages.push(imageObj);
    });
    // @ts-ignore
    const updatedRecipe = yield prisma.recipe.update({
        where: {
            id: req.params.id
        },
        data: {
            //@ts-ignore
            images: recipeImages
        }
    });
    res.json(updatedRecipe);
}));
recipeRouter.put("/:id/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const update_form = req.body;
    const updatedRecipe = yield prisma.recipe.update({
        where: {
            id: req.params.id
        },
        data: {
            categories: {
                createMany: {
                    data: update_form.categories
                }
            }
        },
        include: {
            ingredients: true,
            categories: true
        }
    });
    res.json(updatedRecipe);
}));
exports.default = recipeRouter;
