import { Elysia, t } from "elysia";
import { optionDto, } from "../dtos/option.dto";
import { OptionService } from "../services/option.service";
const option = new Elysia({ prefix: "option" })
  .use(optionDto)
  .get("/", () => OptionService.select())
  .put("/:id", ({ params: { id }, body }) => OptionService.update(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: "option.dto"
  })
  .post("/", ({ body }) => OptionService.create(body), {
    body: "option.dto"
  })
  .delete("/:id", ({ params: { id } }) => OptionService.delete(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .get("/:id", ({ params: { id } }) => OptionService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default option;