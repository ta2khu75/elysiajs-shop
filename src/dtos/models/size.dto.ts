import Elysia, { t } from "elysia"

export interface SizeDto{
    name:string,
    productId:number
}
export const sizeDto=new Elysia({name:"dto.size"}).model({
    "size.dto":t.Object({
        name:t.String(),
        productId:t.Numeric()
    })
})