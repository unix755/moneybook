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
    DeleteTransaction(@Query("id") id: string) {
        return this.transactionService.DeleteTransaction(id)
    }

    @Get()
    ReadTransaction(@Query("id") id: string) {
        return this.transactionService.ReadTransaction(id)
    }
}


@Controller("transactions")
export class TransactionsController {
    constructor(private readonly transactionService: TransactionService) {
    }

    @Delete()
    DeleteTransactions(@Query("id") id: string | string[]) {
        return this.transactionService.DeleteTransactions(id)
    }

    @Get()
    ReadTransactions() {
        return this.transactionService.ReadTransactions()
    }

    @Get("/conditions")
    ReadTransactionsWithConditions(@Query() query: ConditionQuery) {
        return this.transactionService.ReadTransactionsWithConditions(query)
    }

    @Patch("/status")
    PatchStatus(@Body() body: IdsStatusBody) {
        return this.transactionService.PatchTransactionsStatus(body)
    }
}