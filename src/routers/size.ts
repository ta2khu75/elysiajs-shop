import { Elysia, t } from "elysia";
import { sizeDto } from "../dtos/size.dto";
import { SizeService } from "../services/size.service";
const size = new Elysia({ prefix: "size" })
  .use(sizeDto)
  .get("/", () => SizeService.select())
  .put("/:id", ({ params: { id }, body }) => SizeService.update(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: "size.dto"
  })
  .post("/", ({ body }) => SizeService.create(body), {
    body: "size.dto"
  })
  .delete("/:id", ({ params: { id } }) => SizeService.delete(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .get("/:id", ({ params: { id } }) => SizeService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default size;
