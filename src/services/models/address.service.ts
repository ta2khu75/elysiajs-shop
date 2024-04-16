import { db } from "../../utils/prisma";
import { AddressDto } from "../../dtos/models/address.dto";
import { Address } from "@prisma/client";
export abstract class AddressService {
  static async create(body: AddressDto): Promise<Address> {
    return await db.address.create({ data: body });
  }
  static async update(id: number, body: AddressDto): Promise<Address> {
    const { userId, phone, address, selected } = body;
    return await db.address.update({
      data: {
        ...(userId ? { userId } : {}),
        ...(phone ? { phone } : {}),
        ...(address ? { address } : {}),
        ...(selected !== undefined ? { default: selected } : {}),
      },
      where: { id },
    });
  }
  static async find(id: number): Promise<Address | null> {
    return await db.address.findFirst({ where: { id } });
  }
  static async select(): Promise<Address[]> {
    return await db.address.findMany({ orderBy: { id: "desc" } });
  }
  static async delete(id: number): Promise<Address> {
    return await db.address.delete({ where: { id } });
  }
}
