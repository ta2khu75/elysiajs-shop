import { Elysia, t } from "elysia";
import { warehouseDto, } from "../../dtos/models/warehouse.dto";
import { WarehouseService } from "../../services/models/warehouse.service";
const warehouse = new Elysia({ prefix: "warehouse" })
  .use(warehouseDto)
  .get("/", () => WarehouseService.select())
  .put("/:id", ({ params: { id }, body }) => WarehouseService.update(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: "warehouse.dto"
  })
  .post("/", ({ body }) => WarehouseService.create(body), {
    body: "warehouse.dto"
  })
  .delete("/:id", ({ params: { id } }) => WarehouseService.delete(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .get("/:id", ({ params: { id } }) => WarehouseService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default warehouse;
