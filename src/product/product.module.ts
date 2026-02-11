import {Module} from "@nestjs/common"
import {ProductService} from "./product.service"
import {ProductController, ProductsController} from "./product.controller"

@Module({
    providers: [ProductService],
    controllers: [ProductController, ProductsController]
})
export class ProductModule {
}
