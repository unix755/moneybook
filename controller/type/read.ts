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

// 按类型编号查询
async function ReadType(req: express.Request<any, any, any, IdQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.type.findFirst({
        where: {
            id: query.id,
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 查询所有类型
async function ReadTypes(req: express.Request<any, any, any, any>, res: express.Response, next: express.NextFunction) {
    await prisma.type.findMany({})
        .then(function (resp) {
            res.status(200).json(resp)
        }).catch(function (err) {
            res.status(400).type("text/plain").send(err.toString())
        })
}

// 分页查询所有类型
// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
async function ReadTypesWithPagination(req: express.Request<any, any, any, PaginationQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.type.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 模糊查询
async function ReadTypesWithFuzzy(req: express.Request<any, any, any, FuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.type.findMany({
        where: {
            name: {
                contains: query.key
            }
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 模糊分页查询
async function ReadTypesWithPaginationAndFuzzy(req: express.Request<any, any, any, PaginationFuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.type.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
        where: {
            name: {
                contains: query.key
            }
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    ReadType,
    ReadTypes,
    ReadTypesWithPagination,
    ReadTypesWithFuzzy,
    ReadTypesWithPaginationAndFuzzy,
}