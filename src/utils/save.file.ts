// import { v4 as uuidv4 } from "uuid";
// import product from "../routers/product";
// export const saveFile=(id:number,path:File, callback:Function)=>{
//         const file = Bun.file(path.name);
//         const [, type] = file.type.split("/");
//         const fileName = `${uuidv4()}.${type}`;
//         const product=callback(id,product,fileName);
//         //product = await ProductService.update(product.id, product, fileName);
//         if (product) {
//           const pathName = `uploads/image/${fileName}`;
//           await Bun.write(pathName, body.thumbnail);
//           return product;
//         }
// }