import {Body, Controller, Delete, Get, Patch, Post, Put, Query} from "@nestjs/common"
import {TransactionService} from "./transaction.service"
import type {ConditionQuery, IdsStatusBody, TransactionWithProductIds} from "./transaction.service"

@Controller("transaction")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {
    }

    @Post()
    CreateTransaction(@Body() body: TransactionWithProductIds) {
        return this.transactionService.CreateTransaction(body)
    }

    @Put()
    UpdateTransaction(@Body() body: TransactionWithProductIds) {
        return this.transactionService.UpdateTransaction(body)
    }

    @Delete()
    DeleteTransaction(@Query("id") id: string | string[]) {
        return this.transactionService.DeleteTransaction(id)
    }

    @Get()
    ReadTransaction() {
        return this.transactionService.ReadTransaction()
    }

    @Get("/conditions")
    ReadTransactionBasedOnCondition(@Query() query: ConditionQuery) {
        return this.transactionService.ReadTransactionBasedOnCondition(query)
    }

    @Patch("/status")
    PatchTransactionStatus(@Body() body: IdsStatusBody) {
        return this.transactionService.PatchTransactionStatus(body)
    }

}
