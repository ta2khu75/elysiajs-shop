import { Elysia, t } from "elysia";
import { optionDto } from "../../dtos/models/option.dto";
import { OptionService } from "../../services/models/option.service";
import { BadRequestError } from "../../error/BadRequestError";
const option = new Elysia({ prefix: "option" })
  .use(optionDto)
  .get("/", () => OptionService.select())
  .get(
    "/product/:id",
    async ({ params: { id } }) => {
      try {
        const data = await OptionService.findProduct(id);
        return data;
      } catch (error) {
        throw new Error("Could not find option product with error " + error);
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      try {
        await OptionService.update(id, body);
        return { message: "update option product successfully" };
      } catch (error) {
        throw new BadRequestError("Error updating option with error" + error);
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: "option.dto",
    }
  )
  .post(
    "/",
    async ({ body }) => {
      try {
        await OptionService.create(body);
        return { message: "Option created successfully" };
      } catch (error) {
        throw new BadRequestError(
          "Could not create option with error: " + error
        );
      }
    },
    {
      body: "option.dto",
    }
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      try {
        await OptionService.delete(id);
        return { message: "Option deleted successfully" };
      } catch (error) {
        throw new BadRequestError(
          "Could not delete option with error: " + error
        );
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .get("/:id", ({ params: { id } }) => OptionService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default option;
