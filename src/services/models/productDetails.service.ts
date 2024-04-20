import { ProductDetails } from "@prisma/client";
import { db } from "../../utils/prisma";
import { ProductDetailsDto } from "../../dtos/models/productDetails.dto";
import product from "../../routers/models/product";
export abstract class ProductDetailsService {
  static async create(body: ProductDetailsDto): Promise<ProductDetails> {
    return await db.productDetails.create({ data: body });
  }
  static async update(id: number, body: ProductDetailsDto):Promise<ProductDetails> {
    const { sizeId, optionId, price, productId } = body;
    return await db.productDetails.update({
      data: {
        ...(productId? { productId}:{}),
        ...(sizeId ? { sizeId } : {}),
        ...(optionId ? { optionId } : {}),
        ...(price ? { price } : {}),
      },
      where: { id },
    });
  }
  
  static async findProduct(productId: number):Promise<any[]|null> {
    return await db.productDetails.findMany({ select:{id:true,product:true,option:true,size:true,price:true}, where: { productId }});
  }
  static async find(id: number):Promise<ProductDetails|null> {
    return await db.productDetails.findFirst({ where: { id } });
  }
  static async select():Promise<ProductDetails[]> {
    return await db.productDetails.findMany({ orderBy: { id: "desc" } });
  }
  static async delete(id: number):Promise<ProductDetails> {
    return await db.productDetails.delete({ where: { id } });
  }
}
// function exclude<ProductDetails, Key extends keyof ProductDetails>(
//   productDetails: ProductDetails,
//   keys: Key[]
// ): Omit<ProductDetails, Key> {
//   return Object.fromEntries(
//     Object.entries(productDetails).filter(([key]) => !keys.includes(key))
//   )
// }