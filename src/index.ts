import role from "./routers/role";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import user from "./routers/user";
import category from "./routers/category";
import product from "./routers/product";
import size from "./routers/size";
import option from "./routers/option";
import productImage from "./routers/product.image";
import address from "./routers/address";
import order from "./routers/order";
import productDetails from "./routers/product.details";
import warehouse from "./routers/warehouse";
import orderDetails from "./routers/order.details";
import { cors } from "@elysiajs/cors";
const app = new Elysia();
app
  .onError(({})=>{
    
  })
  .use(cors())
  .use(swagger())
  .group("/api", (app) =>
    app
      .use(role)
      .use(user)
      .use(size)
      .use(order)
      .use(option)
      .use(product)
      .use(address)
      .use(category)
      .use(warehouse)
      .use(orderDetails)
      .use(productImage)
      .use(productDetails)
      .get("/", () => "Hello Elysia")
  )
  .listen(3300);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
