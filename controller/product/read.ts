import express from "express"
import {prisma} from "../../main"

interface IdQuery {
    id: string
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

// 按编号查询
async function ReadProduct(req: express.Request<any, any, any, IdQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.product.findFirst({
        where: {
            id: query.id
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 查询所有
async function ReadProducts(req: express.Request<any, any, any, any>, res: express.Response, next: express.NextFunction) {
    await prisma.product.findMany({})
        .then(function (resp) {
            res.status(200).json(resp)
        }).catch(function (err) {
            res.status(400).type("text/plain").send(err.toString())
        })
}

// 分页查询
async function ReadProductsWithPagination(req: express.Request<any, any, any, PaginationQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.product.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 模糊查询
async function ReadProductsWithFuzzy(req: express.Request<any, any, any, FuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query.key
                    }
                },
                {
                    code: {
                        contains: query.key
                    }
                }
            ]
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 模糊分页查询
async function ReadProductsWithPaginationAndFuzzy(req: express.Request<any, any, any, PaginationFuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.product.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
        where: {
            OR: [
                {
                    name: {
                        contains: query.key
                    }
                },
                {
                    code: {
                        contains: query.key
                    }
                }
            ]
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    ReadProduct,
    ReadProducts,
    ReadProductsWithPagination,
    ReadProductsWithFuzzy,
    ReadProductsWithPaginationAndFuzzy,
}