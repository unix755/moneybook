import express from "express"
import {prisma} from "../../main"
import {TransactionModel} from "../../prisma/generated/client/models"

type TransactionWithProductIds = TransactionModel & { productIds?: string[] }

async function CreateTransaction(req: express.Request<any, any, TransactionWithProductIds, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body

    await prisma.transaction.create({
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
    }).then(function (resp) {
        res.status(201).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    CreateTransaction
}