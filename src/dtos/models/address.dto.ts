import Elysia, { t } from "elysia"

export interface AddressDto{
    userId:number,
    phone:string,
    address:string,
    selected?:boolean
}
export const addressDto=new Elysia({name:"dto.address"}).model({
    "address.dto":t.Object({
        userId:t.Numeric(),
        phone:t.String(),
        address:t.String(),
        selected:t.Optional(t.BooleanString())
    })
})