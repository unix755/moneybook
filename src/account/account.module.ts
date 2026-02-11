import {Module} from "@nestjs/common"
import {AccountService} from "./account.service"
import {AccountController, AccountsController} from "./account.controller"

@Module({
    providers: [AccountService],
    controllers: [AccountController, AccountsController]
})
export class AccountModule {
}
