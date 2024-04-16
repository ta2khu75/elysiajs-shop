import Elysia, { t } from "elysia"

export interface OptionDto{
    name:string,
    productId:number
}
export const optionDto=new Elysia({name:"dto.option"}).model({
    "option.dto":t.Object({
        name:t.String(),
        productId:t.Numeric()
    })
})