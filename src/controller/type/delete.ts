import express from "express"
import {prisma} from "../../main"

interface IdQuery {
    id?: string
    name?: string
}

interface IdsQuery {
    // 传入一个 id 时为 string, 传入多个 id 时为 string[]
    ids: string | string[]
}

async function DeleteType(req: express.Request<any, any, any, IdQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    await prisma.type.delete({
        where: {
            id: query.id,
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

async function DeleteTypes(req: express.Request<any, any, any, IdsQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query

    // query.ids 为字符串时转换为单元素数组, 为数组时无改变
    if (query.ids === undefined) {
        res.status(400).type("text/plain").send("ids not found in query")
        return
    }
    query.ids = ([] as string[]).concat(query.ids)

    await prisma.type.deleteMany({
        where:
            {
                id: {
                    in: query.ids
                }
            }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    DeleteType,
    DeleteTypes
}