import { Elysia, t } from "elysia";
export interface WarehouseDto {
  productDetailsId: number;
  remaining: number;
}
export const warehouseDto = new Elysia({ name: "Dto.Warehouse" }).model({
  "warehouse.dto": t.Object({
    productDetailsId: t.Numeric(),
    remaining: t.Numeric(),
  }),
});
