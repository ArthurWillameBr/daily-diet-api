import fastify from "fastify";
import { routes } from "./lib/controllers/routes";

export const app = fastify()

app.register(routes)