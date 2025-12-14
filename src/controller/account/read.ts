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

// 按账户编号查询
async function ReadAccount(req: express.Request<any, any, any, IdQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.account.findFirst({
        where: {
            id: query.id
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 查询所有用户
async function ReadAccounts(req: express.Request<any, any, any, any>, res: express.Response, next: express.NextFunction) {
    await prisma.account.findMany({})
        .then(function (resp) {
            res.status(200).json(resp)
        }).catch(function (err) {
            res.status(400).type("text/plain").send(err.toString())
        })
}

// 分页查询所有账户
// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
async function ReadAccountsWithPagination(req: express.Request<any, any, any, PaginationQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.account.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 模糊查询
async function ReadAccountsWithFuzzy(req: express.Request<any, any, any, FuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.account.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query.key
                    }
                },
                {
                    number: {
                        contains: query.key
                    }
                },
                {
                    type: {
                        contains: query.key
                    }
                },
            ]
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

// 模糊分页查询
async function ReadAccountsWithPaginationAndFuzzy(req: express.Request<any, any, any, PaginationFuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.account.findMany({
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
                    number: {
                        contains: query.key
                    }
                },
                {
                    type: {
                        contains: query.key
                    }
                },
            ]
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    ReadAccount,
    ReadAccounts,
    ReadAccountsWithPagination,
    ReadAccountsWithFuzzy,
    ReadAccountsWithPaginationAndFuzzy,
}