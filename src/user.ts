import Elysia from "elysia";
import userRouter from "./routers/user/user.router";

const user=new Elysia()
.use(userRouter)
export default user;