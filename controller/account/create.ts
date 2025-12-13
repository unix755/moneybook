import express from "express"
import {prisma} from "../../main"
import {AccountModel} from "../../prisma/generated/client/models"

async function CreateAccount(req: express.Request<any, any, AccountModel, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body

    await prisma.account.create({
        data: {
            name: body.name,
            number: body.number,
            type: body.type,
            funds: body.funds,
        }
    }).then(function (resp) {
        res.status(201).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    CreateAccount
}