import express from "express"
import {prisma} from "../../main"
import {TypeModel} from "../../prisma/generated/client/models"

async function CreateType(req: express.Request<any, any, TypeModel, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body

    await prisma.type.create({
        data: {
            name: body.name,
        }
    }).then(function (resp) {
        res.status(201).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    CreateType
}