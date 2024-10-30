import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { CreateMeal } from "./create-meal";
import { VerifyJWT } from "../middlewares/verify-jwt";
import { GetMeals } from "./get-meals";
import { GetMealsById } from "./get-meals-by-id";
import { GetUserTotalMealsWithinDiet } from "./get-user-total-meals-within-diet";
import { GetUserTotalMealsOutsideDiet } from "./get-user-total-meals-outside-diet";

export async function routes(app: FastifyInstance) {
    app.post("/users", register)
    app.post("/sessions", authenticate)

    app.post("/meals", {onRequest: VerifyJWT}, CreateMeal)
    app.get("/meals", {onRequest: VerifyJWT}, GetMeals)
    app.get("/meals/:mealId", {onRequest: VerifyJWT}, GetMealsById)
    app.get("/meals/within-diet", {onRequest: VerifyJWT}, GetUserTotalMealsWithinDiet)
    app.get("/meals/outside-diet", {onRequest: VerifyJWT}, GetUserTotalMealsOutsideDiet)
}