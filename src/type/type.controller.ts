import {Body, Controller, Delete, Get, Post, Put, Query} from "@nestjs/common"
import {TypeService} from "./type.service"
import type {TypeModel} from "../prisma/client/models"

@Controller("type")
export class TypeController {
    constructor(private readonly typeService: TypeService) {
    }

    @Post()
    CreateType(@Body() body: TypeModel) {
        return this.typeService.CreateType(body)
    }

    @Put()
    UpdateType(@Body() body: TypeModel) {
        return this.typeService.UpdateType(body)
    }

    @Delete()
    DeleteType(@Query("id") id: string | string[]) {
        return this.typeService.DeleteType(id)
    }

    @Get()
    ReadType() {
        return this.typeService.ReadType()
    }
}
