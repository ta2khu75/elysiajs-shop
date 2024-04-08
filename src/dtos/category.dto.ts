import Elysia, { t } from "elysia"

export interface CategoryDto{
    name:string,
}
export const categoryDto=new Elysia({name:"dto.category"}).model({
    "category.dto":t.Object({
        name:t.String(),
    })
})