import express from "express"
import {CreateType} from "../controller/type/create"
import {UpdateType} from "../controller/type/update"
import {DeleteType, DeleteTypes} from "../controller/type/delete"
import {
    ReadType,
    ReadTypes,
    ReadTypesWithFuzzy,
    ReadTypesWithPagination,
    ReadTypesWithPaginationAndFuzzy
} from "../controller/type/read"

const router = express.Router()

// 创建
router.post("/type", CreateType)

// 修改
router.put("/type", UpdateType)

// 查询
router.get("/type", ReadType)
router.get("/types", ReadTypes)
router.get("/types/pagination", ReadTypesWithPagination)
router.get("/types/fuzzy", ReadTypesWithFuzzy)
router.get("/types/paginationAndFuzzy", ReadTypesWithPaginationAndFuzzy)

// 删除
router.delete("/type", DeleteType)
router.delete("/types", DeleteTypes)

export {
    router
}