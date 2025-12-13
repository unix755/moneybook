import express from "express"
import {prisma} from "../../main"
import {TransactionModel} from "../../prisma/generated/client/models"

type TransactionWithProductIds = TransactionModel & { productIds?: string[] }

async function UpdateTransaction(req: express.Request<any, any, TransactionWithProductIds, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body

    await prisma.transaction.update({
        where: {
            id: body.id,
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
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    UpdateTransaction
}