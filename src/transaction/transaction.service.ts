import {Body, HttpException, HttpStatus, Injectable, Query} from "@nestjs/common"
import {Prisma} from "../prisma/client/client"
import {prisma} from "../main"
import type {TransactionModel} from "../prisma/client/models"

export type TransactionWithProductIds = TransactionModel & { productIds?: string[] }

export interface IdsStatusBody {
    ids: string[],
    status: string
}

export interface ConditionQuery {
    ids?: string | string[]
    title?: string
    productIds?: string | string[]
    typeIds?: string | string[]
    accountIds?: string | string[]
    startTime?: string
    endTime?: string
    status?: string | string[]
}

@Injectable()
export class TransactionService {
    async CreateTransaction(@Body() body: TransactionWithProductIds) {
        try {
            return await prisma.transaction.create({
                data: {
                    title: body.title,
                    typeId: body.typeId,
                    accountId: body.accountId,
                    amount: body.amount,
                    datetime: body.datetime,
                    status: body.status,
                    // 多对多关联表, 创建关联信息
                    ProductOnTransaction: {
                        create: body.productIds?.map(id => {
                            return {productId: id}
                        })
                    }
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async UpdateTransaction(@Body() body: TransactionWithProductIds) {
        try {
            return await prisma.transaction.update({
                where: {
                    id: body.id
                },
                data: {
                    title: body.title,
                    typeId: body.typeId,
                    accountId: body.accountId,
                    amount: body.amount,
                    datetime: body.datetime,
                    status: body.status,
                    // 多对多关联表, 先删除已有的关联信息 + 后创建新的关联信息
                    ProductOnTransaction: {
                        deleteMany: {
                            transactionId: body.id
                        },
                        create: body.productIds?.map(id => {
                            return {productId: id}
                        })
                    }
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async DeleteTransaction(@Query("id") id: string) {
        // 先删除交易-商品关系表中的关系数据
        try {
            await prisma.productOnTransaction.deleteMany({
                where: {
                    transactionId: id
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }

        // 后删除交易表中的交易数据
        try {
            return await prisma.transaction.delete({
                where: {
                    id: id,
                    ProductOnTransaction: {
                        every: {
                            transactionId: id
                        }
                    }
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async ReadTransaction(@Query("id") id: string) {
        try {
            return await prisma.transaction.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    type: true,
                    account: true,
                    ProductOnTransaction: {
                        select: {
                            product: true
                        }
                    }
                }
            })
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code == "P2025") {
                throw new HttpException({message: `Transaction with id: ${id} not found`}, HttpStatus.OK)
            } else {
                throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
            }
        }
    }

    async DeleteTransactions(@Query("id") id: string | string[]) {
        let deletedIds: string[] = []

        // 判断 id 的类型, id 为字符串时转换为仅包含单个元素的字符串数组, 为字符串数组时无改变
        if (id === undefined) {
            throw new HttpException("id not found in query", HttpStatus.BAD_REQUEST)
        } else {
            deletedIds = ([] as string[]).concat(id)
        }

        // 先删除交易-商品关系表中的关系数据
        try {
            await prisma.productOnTransaction.deleteMany({
                where: {
                    transactionId: {
                        in: deletedIds
                    }
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }

        // 后删除交易表中的交易数据
        try {
            return await prisma.transaction.deleteMany({
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

    async ReadTransactions() {
        try {
            return await prisma.transaction.findMany({
                include: {
                    type: true,
                    account: true,
                    ProductOnTransaction: {
                        select: {
                            product: true
                        }
                    }
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async ReadTransactionsWithConditions(@Query() query: ConditionQuery) {
        // https://github.com/prisma/prisma/discussions/11429
        // 或许也可以考虑使用扩展 https://www.prisma.io/docs/orm/prisma-client/client-extensions
        function generateRelationFilter(relationName: string, column: string, list?: string[]) {
            return list?.map((listElement) => ({
                [relationName]: {
                    some: {
                        [column]: {
                            equals: listElement
                        }
                    }
                }
            }))
        }

        // query.x 为字符串时转换为单元素数组, 为数组时无改变
        query.ids = query.ids === undefined ? undefined : ([] as string[]).concat(query.ids)
        query.productIds = query.productIds === undefined ? undefined : ([] as string[]).concat(query.productIds)
        query.typeIds = query.typeIds === undefined ? undefined : ([] as string[]).concat(query.typeIds)
        query.accountIds = query.accountIds === undefined ? undefined : ([] as string[]).concat(query.accountIds)
        query.status = query.status === undefined ? undefined : ([] as string[]).concat(query.status)

        try {
            return await prisma.transaction.findMany({
                where: {
                    AND: [
                        {id: {in: query?.ids}},
                        {title: {contains: query?.title}},
                        {AND: generateRelationFilter(Prisma.ModelName.ProductOnTransaction, Prisma.ProductOnTransactionScalarFieldEnum.productId, query?.productIds)},
                        {typeId: {in: query?.typeIds}},
                        {accountId: {in: query?.accountIds}},
                        {datetime: {gte: query?.startTime == undefined || isNaN(Date.parse(query?.startTime)) ? undefined : new Date(query?.startTime)}},
                        {datetime: {lte: query?.endTime == undefined || isNaN(Date.parse(query?.endTime)) ? undefined : new Date(query?.endTime)}},
                        {status: {in: query?.status}}
                    ]
                },
                include: {
                    type: true,
                    account: true,
                    ProductOnTransaction: {
                        select: {
                            product: true
                        }
                    }
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async PatchTransactionsStatus(@Body() body: IdsStatusBody) {
        try {
            return await prisma.transaction.updateMany({
                where: {
                    id: {
                        in: body.ids
                    }
                },
                data: {
                    status: body.status
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }
}
