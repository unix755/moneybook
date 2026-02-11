import {Body, Controller, Delete, Get, Post, Put, Query} from "@nestjs/common"
import {AccountService} from "./account.service"
import type {AccountModel} from "../prisma/client/models"

@Controller("account")
export class AccountController {
    constructor(private readonly accountService: AccountService) {
    }

    @Post()
    CreateAccount(@Body() body: AccountModel) {
        return this.accountService.CreateAccount(body)
    }

    @Put()
    UpdateAccount(@Body() body: AccountModel) {
        return this.accountService.UpdateAccount(body)
    }

    @Delete()
    DeleteAccounts(@Query("id") id: string | string[]) {
        return this.accountService.DeleteAccount(id)
    }

    @Get()
    ReadAccounts() {
        return this.accountService.ReadAccount()
    }
}
