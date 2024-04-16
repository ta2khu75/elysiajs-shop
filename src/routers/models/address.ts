import { Elysia, t } from "elysia";
import { addressDto } from "../../dtos/models/address.dto";
import { AddressService } from "../../services/models/address.service";
const address = new Elysia({ prefix: "address" })
  .use(addressDto)
  .get("/", () => AddressService.select())
  .put("/:id", ({ params: { id }, body }) => AddressService.update(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: "address.dto",
  })
  .post("/", ({ body }) => AddressService.create(body), {
    body: "address.dto",
  })
  .delete("/:id", ({ params: { id } }) => AddressService.delete(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .get("/:id", ({ params: { id } }) => AddressService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default address;
