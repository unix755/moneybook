import {Module} from "@nestjs/common"
import {TypeService} from "./type.service"
import {TypeController, TypesController} from "./type.controller"

@Module({
    providers: [TypeService],
    controllers: [TypeController, TypesController]
})
export class TypeModule {
}
