import {Module} from "@nestjs/common"
import {AccountModule} from "./account/account.module"
import {ProductModule} from "./product/product.module"
import {TransactionModule} from "./transaction/transaction.module"
import {TypeModule} from "./type/type.module"

@Module({
    imports: [AccountModule, ProductModule, TransactionModule, TypeModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
