import {Body, HttpException, HttpStatus, Injectable, Query} from "@nestjs/common"
import {Prisma} from "../prisma/client/client"
import {prisma} from "../main"
import type {ProductModel} from "../prisma/client/models"

@Injectable()
export class ProductService {
    async CreateProduct(@Body() body: ProductModel) {
        try {
            return await prisma.product.create({
                data: {
                    name: body.name,
                    code: body.code,
                    specifications: body.specifications,
                    remark: body.remark
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async UpdateProduct(@Body() body: ProductModel) {
        try {
            return await prisma.product.update({
                where: {
                    id: body.id
                },
                data: {
                    name: body.name,
                    code: body.code,
                    specifications: body.specifications,
                    remark: body.remark
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async DeleteProduct(@Query("id") id: string) {
        try {
            return await prisma.product.delete({
                where: {
                    id: id
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async ReadProduct(@Query("id") id: string) {
        try {
            return await prisma.product.findUniqueOrThrow({
                where: {
                    id: id
                }
            })
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code == "P2025") {
                throw new HttpException({message: `Product with id: ${id} not found`}, HttpStatus.OK)
            } else {
                throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
            }
        }
    }

    async DeleteProducts(@Query("id") id: string | string[]) {
        let deletedIds: string[] = []

        // 判断 id 的类型, id 为字符串时转换为仅包含单个元素的字符串数组, 为字符串数组时无改变
        if (id === undefined) {
            throw new HttpException("id not found in query", HttpStatus.BAD_REQUEST)
        } else {
            deletedIds = ([] as string[]).concat(id)
        }

        try {
            return await prisma.product.deleteMany({
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

    async ReadProducts() {
        try {
            return await prisma.product.findMany()
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }
}
