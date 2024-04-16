import { Elysia, t } from "elysia";
import { userDto } from "../../dtos/models/user.dto";
import { UserService } from "../../services/models/user.service";
import { BadRequestError } from "../../error/BadRequestError";
const user = new Elysia({ prefix: "user" })
  .use(userDto)
  .get(
    "/",
    async ({ query: { page, size } }) => {
      const users = await UserService.select();
      size = size === undefined ? 5 : size;
      const pageCount = Math.ceil(users.length / size);
      const paginate = await UserService.paginate(page, size);
      return { pageCount, paginate };
    },
    {
      query: t.Object({
        page: t.Optional(t.Numeric()),
        size: t.Optional(t.Numeric()),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      try {
        await UserService.update(id, body);
        return { message: "Update user successfully" };
      } catch (error) {
        throw new BadRequestError(`Update user failed with error: ${error}`);
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: "user.dto",
    }
  )
  .post(
    "/",
    async ({ body }) => {
      try {
        const data = await UserService.create(body);
        return { message: "Create user successfully" };
      } catch (error) {
        throw new BadRequestError(`Create user failed with error: ${error}`);
      }
    },
    {
      //  async beforeHandle({jwt,set, cookie:{author}}) {
      //   console.log(author);
      //   console.log(
      //     author.value
      //   );
      //     const token=await jwt.verify(author.value)
      //     if(token){
      //       return true
      //     }else{
      //       return (set.status = 'Unauthorized')
      //     }
      //  console.log(token);
      //   re_QxsCo8yA_CAZN7n3jZxxi2q5S4EpAxb1q

      // if(token){
      //   if()
      // }else{
      //   throw new UnauthorizedError("Unauthorized ....")
      // }

      body: "user.dto",
    }
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      try {
        await UserService.delete(id);
        return { message: "Delete user successfully " };
      } catch (error) {
        throw new Error(`Could not delete user with error: ${error}`);
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .get("/:id", ({ params: { id } }) => UserService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default user;
