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
    DeleteAccount(@Query("id") id: string) {
        return this.accountService.DeleteAccount(id)
    }

    @Get()
    ReadAccount(@Query("id") id: string) {
        return this.accountService.ReadAccount(id)
    }
}


@Controller("accounts")
export class AccountsController {
    constructor(private readonly accountService: AccountService) {
    }

    @Delete()
    DeleteAccounts(@Query("id") id: string | string[]) {
        return this.accountService.DeleteAccounts(id)
    }

    @Get()
    ReadAccounts() {
        return this.accountService.ReadAccounts()
    }
}