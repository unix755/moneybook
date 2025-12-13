import express from "express"
import {prisma} from "../../main"
import {TypeModel} from "../../prisma/generated/client/models"

async function UpdateType(req: express.Request<any, any, TypeModel, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body

    await prisma.type.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    UpdateType
}