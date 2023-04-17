import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import userRouter from "./routes/users";
import recipeRouter from "./routes/recipes";
import ingredientRouter from "./routes/ingredients";
import baseRouter from "./routes/base";

const app: Express = express();
const port = 3100;

const options: cors.CorsOptions = {
    origin: '*'
};

app.use(cors(options));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api",baseRouter)
app.use("/api/users",userRouter)
app.use("/api/recipes",recipeRouter)
app.use("/api/ingredients",ingredientRouter)
app.get("/",async (req:Request,res:Response) => {
    res.send("Meal Mingle API")
})
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});