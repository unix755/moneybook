import {Module} from "@nestjs/common"
import {TransactionController, TransactionsController} from "./transaction.controller"
import {TransactionService} from "./transaction.service"

@Module({
    providers: [TransactionService],
    controllers: [TransactionController, TransactionsController]
})
export class TransactionModule {
}
