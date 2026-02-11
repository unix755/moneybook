import {Body, HttpException, HttpStatus, Injectable, Query} from "@nestjs/common"
import {Prisma} from "../prisma/client/client"
import {prisma} from "../main"
import type {AccountModel} from "../prisma/client/models"

@Injectable()
export class AccountService {
    async CreateAccount(@Body() body: AccountModel) {
        try {
            return await prisma.account.create({
                data: {
                    name: body.name,
                    number: body.number,
                    type: body.type,
                    funds: body.funds
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async UpdateAccount(@Body() body: AccountModel) {
        try {
            return await prisma.account.update({
                where: {
                    id: body.id
                },
                data: {
                    name: body.name,
                    number: body.number,
                    type: body.type,
                    funds: body.funds
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async DeleteAccount(@Query("id") id: string) {
        try {
            return await prisma.account.delete({
                where: {
                    id: id
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async ReadAccount(@Query("id") id: string) {
        try {
            return await prisma.account.findUniqueOrThrow({
                where: {
                    id: id
                }
            })
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code == "P2025") {
                throw new HttpException({message: `Account with id: ${id} not found`}, HttpStatus.OK)
            } else {
                throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
            }
        }
    }

    async DeleteAccounts(@Query("id") id: string | string[]) {
        let deletedIds: string[] = []

        // 判断 id 的类型, id 为字符串时转换为仅包含单个元素的字符串数组, 为字符串数组时无改变
        if (id === undefined) {
            throw new HttpException("id not found in query", HttpStatus.BAD_REQUEST)
        } else {
            deletedIds = ([] as string[]).concat(id)
        }

        try {
            return await prisma.account.deleteMany({
                where: {
                    id: {
                        in: deletedIds
                    }
                }
            })
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }

    async ReadAccounts() {
        try {
            return await prisma.account.findMany()
        } catch (err) {
            throw new HttpException((err as Error), HttpStatus.BAD_REQUEST)
        }
    }
}
