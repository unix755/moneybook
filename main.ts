import express from "express"
import cors from "cors"
import {program} from "commander"
import {PrismaMariaDb} from "@prisma/adapter-mariadb"
import {PrismaClient} from "./prisma/generated/client/client"
import * as account from "./internal/router/account"
import * as type from "./internal/router/type"
import * as transaction from "./internal/router/transaction"
import * as product from "./internal/router/product"

const adapter = new PrismaMariaDb("")
const prismaDBAdapter = {adapter}

// 命令行参数
program
    .requiredOption("-d, --database <string>", "database source url")
    .option("-a, --address [string]", "ip address", "127.0.0.1")
    .option("-p, --port [number]", "port", "8000")
    .action(() => {
        prismaDBAdapter.adapter = new PrismaMariaDb(program.opts().database)
    })
program.parse()

function main() {
    // 新建应用
    const app = express()

    // 加载跨域访问中间件
    app.use(cors())

    // 加载路由中间件
    app.use(account.router)
    app.use(type.router)
    app.use(product.router)
    app.use(transaction.router)

    // 应用启动
    app.listen(program.opts().port, program.opts().address)
}

main()

export const prisma = new PrismaClient(prismaDBAdapter)
