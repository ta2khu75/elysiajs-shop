import { Elysia, t } from "elysia";
import { db } from "../../utils/prisma";
import { UnauthorizedError } from "../../error/UnauthorizedError";
import { BadRequestError } from "../../error/BadRequestError";
import role from "../models/role";
const userRouter = new Elysia()
  .post(
    "/login",
    async ({ jwt, body: { email, password }}) => {
      const user = await db.user.findFirst({ where: { email } });
      if (user?.password === password) {
        const token=await jwt.sign({ email, roleId:user.roleId});
        return {
          message:"Login successfully",
          token
        }
      }
      throw new BadRequestError("email or password incorrect");
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .post(
    "/register",
    async ({ body: { email, password, name } }) => {
      const userExisting=await db.user.findFirst({where:{email}})
      let user;
      if(userExisting ===null){
        try {
          console.log(email);
          
        user=await db.user.create({data:{email, password, name, roleId:1}})
        } catch (error) {
        console.log(error);
          
        }
      }
      if(user===undefined){
        throw new BadRequestError("Register failed")
      }
      return {message:"Register successfully"}
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String(),
        name: t.String()
      }),
    }
  );

export default userRouter;
