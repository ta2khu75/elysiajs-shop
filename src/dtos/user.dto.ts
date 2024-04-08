import { Elysia, t } from "elysia";
export interface UserDto {
  email: string;
  password: string;
  name: string;
  locked?: boolean;
  roleId: number;
}
export const userDto = new Elysia({ name: "Dto.User" }).model({
  "user.dto": t.Object({
    email: t.String({format:"email"}),
    password: t.String(),
    name: t.String(),
    locked: t.Optional(t.BooleanString()),
    roleId: t.Numeric(),
  }),
})
