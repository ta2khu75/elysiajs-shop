import { db } from "../../utils/prisma";
import { RoleDto } from "../../dtos/models/role.dto";
import { Role } from "@prisma/client";
export abstract class RoleService {
  static async create(body: RoleDto):Promise<Role> {
    return await db.role.create({ data: body });
  }
  static async update(id: number, body: RoleDto):Promise<Role> {
    const { name } = body;
    return await db.role.update({
      data: { ...(name ? { name } : {}) },
      where: { id },
    });
  }
  static async find(id: number):Promise<Role|null> {
    return await db.role.findFirst({ where: { id } });
  }
  static async select():Promise<Role[]> {
    return await db.role.findMany({ orderBy: { id: "asc" } });
  }
  static async delete(id: number):Promise<Role> {
    return await db.role.delete({ where: { id } });
  }
}
