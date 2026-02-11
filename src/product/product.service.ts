import {Body, HttpException, HttpStatus, Injectable, Query} from "@nestjs/common"
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

    async DeleteProduct(@Query("id") id: string | string[]) {
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

    async ReadProduct() {
        try {
            return await prisma.product.findMany()
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }
}
