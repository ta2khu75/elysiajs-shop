import { Elysia, t } from "elysia";
import { userDto, } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
const user = new Elysia({ prefix: "user" })
  .use(userDto)
  .get("/", async({query:{page, size}}) => {
    const users = await UserService.select(); 
    size=size===undefined?5:size
    const pageCount=Math.ceil(users.length/size);
    const paginate=await UserService.paginate(page, size)
    return {pageCount,paginate}
  },{
    query:t.Object({
      page:t.Optional(t.Numeric()),
      size:t.Optional(t.Numeric())
    })
  })
  .put("/:id", ({ params: { id }, body }) => UserService.update(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: "user.dto"
  })
  .post("/", ({ body }) => UserService.create(body), {
    body: "user.dto"
  })
  .delete("/:id", ({ params: { id } }) => UserService.delete(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .get("/:id", ({ params: { id } }) => UserService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default user;
