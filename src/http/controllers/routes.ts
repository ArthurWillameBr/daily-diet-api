import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { CreateMeal } from "./create-meal";
import { VerifyJWT } from "../middlewares/verify-jwt";
import { GetMeals } from "./get-meals";
import { GetMealsById } from "./get-meals-by-id";
import { GetUserTotalMealsWithinDiet } from "./get-user-total-meals-within-diet";
import { GetUserTotalMealsOutsideDiet } from "./get-user-total-meals-outside-diet";
import { GetUserTotalMeals } from "./get-user-total-meals";
import { UpdateMeal } from "./update-meal";
import { GetLastRegisteredMeals } from "./get-last-registered-meals";
import { GetBestOnDietSequence } from "./get-best-on-diet-sequence";
import { GenerateDietReport } from "./generate-diet-report";
import { RevenueGeneration } from "./revenue-generation";
import { GetGamificationStatus } from "./get-gamification-status";
import { DeleteMeals } from "./delete-meal";
import { GetProfile } from "./get-profile";

export async function routes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.post("/meals", { onRequest: VerifyJWT }, CreateMeal);
  app.get("/meals", { onRequest: VerifyJWT }, GetMeals);
  app.get("/meals/:mealId", { onRequest: VerifyJWT }, GetMealsById);
  app.put("/meals/:mealId/update", { onRequest: VerifyJWT }, UpdateMeal);
  app.get(
    "/meals/within-diet",
    { onRequest: VerifyJWT },
    GetUserTotalMealsWithinDiet
  );
  app.delete("/meals/:mealId", { onRequest: VerifyJWT }, DeleteMeals);
  app.get(
    "/meals/outside-diet",
    { onRequest: VerifyJWT },
    GetUserTotalMealsOutsideDiet
  );
  app.get("/meals/total", { onRequest: VerifyJWT }, GetUserTotalMeals);
  app.get(
    "/meals/last-registered",
    { onRequest: VerifyJWT },
    GetLastRegisteredMeals
  );
  app.get("/profile", { onRequest: VerifyJWT }, GetProfile);
  app.get(
    "/meals/best-diet-sequence",
    { onRequest: VerifyJWT },
    GetBestOnDietSequence
  );

  app.get("/meals/ai-report", { onRequest: VerifyJWT }, GenerateDietReport);

  app.get(
    "/meals/generate-recipe",
    { onRequest: VerifyJWT },
    RevenueGeneration
  );

  app.get(
    "/gamification/status",
    { onRequest: VerifyJWT },
    GetGamificationStatus
  );
}
