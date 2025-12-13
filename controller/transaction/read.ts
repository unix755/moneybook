import express from "express"
import {prisma} from "../../main"
import {Prisma} from "../../prisma/generated/client/client"

interface IdQuery {
    id: string
}

interface ConditionQuery {
    ids?: string | string[]
    title?: string
    productIds?: string | string[]
    typeIds?: string | string[]
    accountIds?: string | string[]
    startTime?: string
    endTime?: string
    status?: string | string[]
}

interface PaginationQuery {
    skip: string
    take: string
}

interface FuzzyQuery {
    key: string
}

interface PaginationFuzzyQuery extends PaginationQuery, FuzzyQuery {

}

// 按交易编号查询
async function ReadTransaction(req: express.Request<any, any, any, IdQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.transaction.findFirst({
        where: {
            id: query.id,
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
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 查询所有交易
async function ReadTransactions(req: express.Request<any, any, any, any>, res: express.Response, next: express.NextFunction) {
    await prisma.transaction.findMany({
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
        .then(function (resp) {
            res.status(200).json(resp)
        }).catch(function (err) {
            res.status(400).type("text/plain").send(err.toString())
        })
}

// 多条件查询所有交易
async function ReadTransactionsWithConditions(req: express.Request<any, any, any, ConditionQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

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

    await prisma.transaction.findMany({
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
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 分页查询所有交易
// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
async function ReadTransactionsWithPagination(req: express.Request<any, any, any, PaginationQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.transaction.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
        include: {
            type: true,
            account: true,
            ProductOnTransaction: {
                select: {
                    product: true
                }
            }
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 模糊查询所有交易
async function ReadTransactionsWithFuzzy(req: express.Request<any, any, any, FuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    // 多表关联查询 https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries
    // 查询结果包含拼接的关联表
    await prisma.transaction.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: query.key
                    }
                },
                {
                    ProductOnTransaction: {
                        some: {
                            product: {
                                name: {
                                    contains: query.key
                                }
                            }
                        }
                    }
                },
                {
                    ProductOnTransaction: {
                        some: {
                            product: {
                                code: {
                                    contains: query.key
                                }
                            }
                        }
                    }
                }
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
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 模糊分页查询所有交易
async function ReadTransactionsWithPaginationAndFuzzy(req: express.Request<any, any, any, PaginationFuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.transaction.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
        where: {
            OR: [
                {
                    title: {
                        contains: query.key
                    }
                },
                {
                    ProductOnTransaction: {
                        some: {
                            product: {
                                name: {
                                    contains: query.key
                                }
                            }
                        }
                    }
                },
                {
                    ProductOnTransaction: {
                        some: {
                            product: {
                                code: {
                                    contains: query.key
                                }
                            }
                        }
                    }
                }
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
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    ReadTransaction,
    ReadTransactions,
    ReadTransactionsWithConditions,
    ReadTransactionsWithPagination,
    ReadTransactionsWithFuzzy,
    ReadTransactionsWithPaginationAndFuzzy,
}