import express from "express"
import {prisma} from "../../main"
import {AccountModel} from "../../prisma/generated/client/models"

async function UpdateAccount(req: express.Request<any, any, AccountModel, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body

    await prisma.account.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
            number: body.number,
            type: body.type,
            funds: body.funds,
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    UpdateAccount
}