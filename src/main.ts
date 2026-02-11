import {NestFactory} from "@nestjs/core"
import {PrismaMariaDb} from "@prisma/adapter-mariadb"
import {program} from "commander"
import {AppModule} from "./app.module"
import {PrismaClient} from "./prisma/client/client"

// 新建 prisma 客户端
const adapter = new PrismaMariaDb("")
const prismaDBAdapter = {adapter}

// 设置命令行参数
program
    .requiredOption("-d, --database <string>", "database source url")
    .option("-a, --address [string]", "ip address", "127.0.0.1")
    .option("-p, --port [number]", "port", "8000")
    .action(() => {
        prismaDBAdapter.adapter = new PrismaMariaDb(program.opts().database)
    })
program.parse()

// 导出全局 prisma 客户端
export const prisma = new PrismaClient(prismaDBAdapter)

// 运行引导程序
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true})
    await app.listen(program.opts().port, program.opts().address)
}

try {
    await bootstrap()
} catch (err) {
    console.error(err)
}