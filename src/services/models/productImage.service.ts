import { ProductImage } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../utils/prisma";
import { ProductImageDto } from "../../dtos/models/productImage.dto";
export abstract class ProductImageService {
  static async create(body: ProductImageDto): Promise<ProductImage[]> {
    return await Promise.all(
      body.image.map(async (image: File) => {
        const file = Bun.file(image.name);
        const [, type] = file.type.split("/");
        const fileName = `${uuidv4()}.${type}`;
        const data = {
          productId: body.productId,
          image: fileName,
        };
        const productImage: ProductImage = await db.productImage.create({
          data,
        });
        if (productImage) {
          const pathName = `uploads/image/product/${body.productId}/${fileName}`;
          await Bun.write(pathName, image);
        }
        return productImage;
      })
    );
    //return await db.productImage.create({ data: body });
  }
  static async selectByProduct(id:number): Promise<ProductImage[]> {
    return await db.productImage.findMany({where: {productId: id}});
  }
  static async update(
    id: number,
    body: ProductImageDto
  ): Promise<ProductImage> {
    const image = body.image[0];
    const file = Bun.file(image.name);
    const [, type] = file.type.split("/");
    const fileName = `${uuidv4()}.${type}`;
    const { productId } = body;
    const productImage = await db.productImage.update({
      data: {
        ...(fileName ? { image: fileName } : {}),
        ...(productId ? { productId } : {}),
      },
      where: { id },
    });
    if (productImage) {
      const pathName = `uploads/image/product/${body.productId}/${fileName}`;
      await Bun.write(pathName, image);
    }
    return productImage;
  }
  static async find(id: number): Promise<ProductImage | null> {
    return await db.productImage.findFirst({ where: { id } });
  }
  static async select(): Promise<ProductImage[]> {
    return await db.productImage.findMany({ orderBy: { id: "desc" } });
  }
  static async delete(id: number): Promise<ProductImage> {
    return await db.productImage.delete({ where: { id } });
  }
}
