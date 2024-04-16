import Elysia, { t } from "elysia";

export interface CategoryDto {
  name: string;
  image?: File;
}
export const categoryDto = new Elysia({ name: "dto.category" }).model({
  "category.dto": t.Object({
    image: t.Optional(
      t.File({
        type: ["image/png", "image/jpeg"],
        maxSize: `${5}${"m"}`,
      })
    ),
    name: t.String(),
  }),
});
