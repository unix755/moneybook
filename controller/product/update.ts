import express from "express"
import {prisma} from "../../main"
import {ProductModel} from "../../prisma/generated/client/models"

async function UpdateProduct(req: express.Request<any, any, ProductModel, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body

    await prisma.product.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
            code: body.code,
            specifications: body.specifications,
            remark: body.remark
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    UpdateProduct
}