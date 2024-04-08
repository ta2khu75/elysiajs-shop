import { Elysia, t } from "elysia";
import { roleDto } from "../dtos/role.dto";
import { RoleService } from "../services/role.service";
const role = new Elysia({ prefix: "role" })
  .use(roleDto)
  .get("/", () => RoleService.select())
  .put("/:id", ({ params: { id }, body }) => RoleService.update(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: "role.dto"
  })
  .post("/", ({ body }) => RoleService.create(body), {
    body: "role.dto"
  })
  .delete("/:id", ({ params: { id } }) => RoleService.delete(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .get("/:id", ({ params: { id } }) => RoleService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default role;
