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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const recipeRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
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
recipeRouter.get("/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield prisma.category.findMany({});
    res.json(categories);
}));
exports.default = recipeRouter;
