import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { CreateMeal } from "./create-meal";
import { VerifyJWT } from "../middlewares/verify-jwt";
import { GetMeals } from "./get-meals";

export async function routes(app: FastifyInstance) {
    app.post("/users", register)
    app.post("/sessions", authenticate)

    app.post("/meals", {onRequest: VerifyJWT}, CreateMeal)
    app.get("/meals", {onRequest: VerifyJWT}, GetMeals)
}