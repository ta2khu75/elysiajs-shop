import { Elysia, t } from "elysia";
import swagger from "@elysiajs/swagger";
import user from "./routers/user/user.router"
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import idDto from "./dtos/id.dto";
import { UnauthorizedError } from "./error/UnauthorizedError";
import { BadRequestError } from "./error/BadRequestError";
import admin from "./admin";
const app = new Elysia();
app
  .error({ UnauthorizedError })
  .error({ BadRequestError })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "NOT_FOUND":
        set.status = 404;
        return { message: error.message };
      case "UnauthorizedError":
        set.status = 401;
        return { message: error.message };
      case "BadRequestError":
        set.status = 400;
        return { message: error.message };
    }
  })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
      exp: "1h",
    })
  )
  .use(cors())
  .use(swagger())
  .use(idDto)
  .group("/api", (app) =>
    app
      .use(user)
      .use(admin)
      .get("/", () => "Hello Elysia")
  )
  .listen(3300);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
