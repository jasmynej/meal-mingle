"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = require("express");
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_s3_1 = __importDefault(require("multer-s3"));
const multer_1 = __importDefault(require("multer"));
const imageRouter = (0, express_1.Router)();
const s3_client = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID ? process.env.AWS_ACCESS_ID : "",
        secretAccessKey: process.env.AWS_SECRET_KEY ? process.env.AWS_SECRET_KEY : ""
    },
    region: "us-east-1"
});
const s3Storage = (0, multer_s3_1.default)({
    s3: s3_client,
    bucket: "meal-mingle",
    key: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname); //use Date.now() for unique file keys
    }
});
const upload = (0, multer_1.default)({
    storage: s3Storage,
});
imageRouter.get("/s3-images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listObjects = new client_s3_1.ListObjectsCommand({
        Bucket: "meal-mingle"
    });
    const objs = yield s3_client.send(listObjects);
    res.json(objs.Contents);
}));
imageRouter.get("/:key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${process.env.AWS_S3_URL}${req.params.key}`);
    res.json({ url: `${process.env.AWS_S3_URL}${req.params.key}` });
}));
imageRouter.post("/upload", upload.array('imgs', 5), (req, res) => {
    res.send("uploaded");
});
exports.default = imageRouter;
