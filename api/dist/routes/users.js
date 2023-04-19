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
const userRouter = (0, express_1.Router)();
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
userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma.user.findMany({});
    res.json(allUsers);
}));
userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            id: req.params.id
        },
        include: {
            recipes: true,
            comments: true,
        }
    });
    res.json(user);
}));
userRouter.post("/sign-up", s3Upload.single("profile-img"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const form = req.body;
    console.log(req.file);
    console.log(form);
    // @ts-ignore
    const user = yield prisma.user.create({
        data: {
            username: form.username,
            email: form.email,
            password: form.password,
            profilePic: {
                // @ts-ignore
                fileName: (_a = req.file) === null || _a === void 0 ? void 0 : _a.key,
                // @ts-ignore
                s3Link: (_b = req.file) === null || _b === void 0 ? void 0 : _b.location
            }
        }
    });
    res.json(user);
}));
userRouter.post("/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = req.body;
    const user = yield prisma.user.findFirst({
        where: {
            username: form.username
        }
    });
    if (user === null) {
        res.json({
            msg: "User does not exist",
            success: false
        });
    }
    else {
        if (user.password === form.password) {
            res.json({
                user: user,
                success: true
            });
        }
        else {
            res.json({
                msg: "Incorrect Password",
                success: false
            });
        }
    }
}));
exports.default = userRouter;
