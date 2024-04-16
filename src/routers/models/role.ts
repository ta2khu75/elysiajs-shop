import { Elysia, t } from "elysia";
import { roleDto } from "../../dtos/models/role.dto";
import { RoleService } from "../../services/models/role.service";
import { BadRequestError } from "../../error/BadRequestError";
const role = new Elysia({ prefix: "role" })
  .use(roleDto)
  .get("/", () => RoleService.select())
  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      try {
        await RoleService.update(id, body);
        return { message: "Update role successfully" };
      } catch (error) {
        console.log(error);
        throw new BadRequestError(`Update role failed with error: ${error}`);
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: "role.dto",
    }
  )
  .post(
    "/",
    async ({ body }) => {
      try {
        await RoleService.create(body);
        return { message: "Create role successfully" };
      } catch (error) {
        console.log(error);
        throw new BadRequestError(`Update role failed with error: ${error}`);
      }
    },
    {
      body: "role.dto",
    }
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      try {
        await RoleService.delete(id);
        return { message: "Remove role successfully" };
      } catch (error) {
        throw new BadRequestError(`Remove role failed with error: ${error}`);
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .get("/:id", ({ params: { id } }) => RoleService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default role;
