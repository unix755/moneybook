import express from "express"
import {CreateProduct} from "../controller/product/create"
import {UpdateProduct} from "../controller/product/update"
import {DeleteProduct, DeleteProducts} from "../controller/product/delete"
import {
    ReadProduct,
    ReadProducts,
    ReadProductsWithFuzzy,
    ReadProductsWithPagination,
    ReadProductsWithPaginationAndFuzzy
} from "../controller/product/read"

const router = express.Router()

// 创建
router.post("/product", CreateProduct)

// 修改
router.put("/product", UpdateProduct)

// 查询
router.get("/product", ReadProduct)
router.get("/products", ReadProducts)
router.get("/products/pagination", ReadProductsWithPagination)
router.get("/products/fuzzy", ReadProductsWithFuzzy)
router.get("/products/paginationAndFuzzy", ReadProductsWithPaginationAndFuzzy)

// 删除
router.delete("/product", DeleteProduct)
router.delete("/products", DeleteProducts)

export {
    router
}