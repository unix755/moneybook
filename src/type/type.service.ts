import {Body, HttpException, HttpStatus, Injectable, Query} from "@nestjs/common"
import {Prisma} from "../prisma/client/client"
import {prisma} from "../main"
import type {TypeModel} from "../prisma/client/models"

@Injectable()
export class TypeService {
    async CreateType(@Body() body: TypeModel) {
        try {
            return await prisma.type.create({
                data: {
                    name: body.name
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async UpdateType(@Body() body: TypeModel) {
        try {
            return await prisma.type.update({
                where: {
                    id: body.id
                },
                data: {
                    name: body.name
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async DeleteType(@Query("id") id: string) {
        try {
            return await prisma.type.delete({
                where: {
                    id: id
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async ReadType(@Query("id") id: string) {
        try {
            return await prisma.type.findUniqueOrThrow({
                where: {
                    id: id
                }
            })
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code == "P2025") {
                throw new HttpException({message: `Type with id: ${id} not found`}, HttpStatus.OK)
            } else {
                throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
            }
        }
    }

    async DeleteTypes(@Query("id") id: string | string[]) {
        let deletedIds: string[] = []

        // 判断 id 的类型, id 为字符串时转换为仅包含单个元素的字符串数组, 为字符串数组时无改变
        if (id === undefined) {
            throw new HttpException("id not found in query", HttpStatus.BAD_REQUEST)
        } else {
            deletedIds = ([] as string[]).concat(id)
        }

        try {
            return await prisma.type.deleteMany({
                where: {
                    id: {
                        in: deletedIds
                    }
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async ReadTypes() {
        try {
            return await prisma.type.findMany()
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }
}
