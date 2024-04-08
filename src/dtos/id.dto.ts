import Elysia, { t } from "elysia";

const idDto = new Elysia({name:"dto.name"}).model({
  "id.dto": t.Object({
    id: t.Numeric(),
  }),
});
export default idDto