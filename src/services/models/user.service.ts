import { db } from "../../utils/prisma";
import { UserDto } from "../../dtos/models/user.dto";
import { User } from "@prisma/client";
import { NotFoundError } from "elysia";
export abstract class UserService {
  static async create(body: UserDto): Promise<User> {
    const roleExisting=await db.role.findFirst({
      where:{id:body.roleId}
    })
    if(roleExisting===null) throw new NotFoundError(`Cannot find with roleId: ${body.roleId}`)
    return await db.user.create({ data: body });
  }
  static async update(id: number, body: UserDto): Promise<User> {
    const roleExisting=await db.role.findFirst({
      where:{id:body.roleId}
    })
    if(roleExisting===null) throw new NotFoundError(`Cannot find with roleId: ${body.roleId}`)
    const { email, password, name, locked, roleId } = body;
    return await db.user.update({
      data: {
        ...(email ? { email } : {}),
        ...(password ? { password } : {}),
        ...(name ? { name } : {}),
        ...(locked !== undefined ? { locked } : {}),
        ...(roleId ? { roleId } : {}),
      },
      where: { id },
    });
  }
  static async paginate(page: number | undefined, size: number | undefined) {
    page = page === undefined ? 0 : page;
    size = size === undefined ? 5 : size;
    return await db.user.findMany({
      skip: page * size,
      take: size,
      orderBy:{id:"desc"},
      include: { role: true },
    });
  }
  static async find(id: number): Promise<User | null> {
    return await db.user.findFirst({ where: { id } });
  }
  static async select(): Promise<User[]> {
    return await db.user.findMany({
      orderBy: { id: "asc" },
      include: { role: true },
    });
  }
  static async delete(id: number): Promise<User> {
    return await db.user.delete({ where: { id } });
  }
}
