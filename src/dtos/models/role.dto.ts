import Elysia, { t } from "elysia"

export interface RoleDto{
    name:string,
}
export const roleDto=new Elysia({name:"dto.role"}).model({
    "role.dto":t.Object({
        name:t.String(),
    })
})