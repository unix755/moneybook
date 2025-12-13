import express from "express"
import {CreateAccount} from "../controller/account/create"
import {UpdateAccount} from "../controller/account/update"
import {DeleteAccount, DeleteAccounts} from "../controller/account/delete"
import {
    ReadAccount,
    ReadAccounts,
    ReadAccountsWithFuzzy,
    ReadAccountsWithPagination,
    ReadAccountsWithPaginationAndFuzzy
} from "../controller/account/read"

const router = express.Router()

// 创建
router.post("/account", CreateAccount)

// 修改
router.put("/account", UpdateAccount)

// 查询
router.get("/account", ReadAccount)
router.get("/accounts", ReadAccounts)
router.get("/accounts/pagination", ReadAccountsWithPagination)
router.get("/accounts/fuzzy", ReadAccountsWithFuzzy)
router.get("/accounts/paginationAndFuzzy", ReadAccountsWithPaginationAndFuzzy)

// 删除
router.delete("/account", DeleteAccount)
router.delete("/accounts", DeleteAccounts)

export {
    router
}