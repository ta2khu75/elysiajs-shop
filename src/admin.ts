import Elysia from "elysia";
import role from "./routers/models/role";
import user from "./routers/models/user";
import size from "./routers/models/size";
import order from "./routers/models/order";
import option from "./routers/models/option";
import product from "./routers/models/product";
import address from "./routers/models/address";
import category from "./routers/models/category";
import warehouse from "./routers/models/warehouse";
import orderDetails from "./routers/models/order.details";
import productImage from "./routers/models/product.image";
import productDetails from "./routers/models/product.details";

const admin=new Elysia({prefix:"/admin"})
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
export default admin