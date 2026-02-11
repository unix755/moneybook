import {Body, Controller, Delete, Get, Post, Put, Query} from "@nestjs/common"
import {ProductService} from "./product.service"
import type {ProductModel} from "../prisma/client/models"

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Post()
    CreateProduct(@Body() body: ProductModel) {
        return this.productService.CreateProduct(body)
    }

    @Put()
    UpdateProduct(@Body() body: ProductModel) {
        return this.productService.UpdateProduct(body)
    }

    @Delete()
    DeleteProduct(@Query("id") id: string) {
        return this.productService.DeleteProduct(id)
    }

    @Get()
    ReadProduct(@Query("id") id: string) {
        return this.productService.ReadProduct(id)
    }
}


@Controller("products")
export class ProductsController {
    constructor(private readonly productService: ProductService) {
    }

    @Delete()
    DeleteProducts(@Query("id") id: string | string[]) {
        return this.productService.DeleteProducts(id)
    }

    @Get()
    ReadProducts() {
        return this.productService.ReadProducts()
    }
}