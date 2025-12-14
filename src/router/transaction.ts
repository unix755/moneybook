import express from "express"
import {CreateTransaction} from "../controller/transaction/create"
import {UpdateTransaction} from "../controller/transaction/update"
import {DeleteTransaction, DeleteTransactions} from "../controller/transaction/delete"
import {
    ReadTransaction,
    ReadTransactions,
    ReadTransactionsWithConditions,
    ReadTransactionsWithFuzzy,
    ReadTransactionsWithPagination,
    ReadTransactionsWithPaginationAndFuzzy
} from "../controller/transaction/read"
import {PatchTransactionsStatus} from "../controller/transaction/patch"

const router = express.Router()

// 创建
router.post("/transaction", CreateTransaction)

// 修改
router.put("/transaction", UpdateTransaction)

// 修改状态
router.patch("/transactions/status", PatchTransactionsStatus)

// 查询
router.get("/transaction", ReadTransaction)
router.get("/transactions", ReadTransactions)
router.get("/transactions/conditions", ReadTransactionsWithConditions)
router.get("/transactions/pagination", ReadTransactionsWithPagination)
router.get("/transactions/fuzzy", ReadTransactionsWithFuzzy)
router.get("/transactions/paginationAndFuzzy", ReadTransactionsWithPaginationAndFuzzy)

// 删除
router.delete("/transaction", DeleteTransaction)
router.delete("/transactions", DeleteTransactions)

export {
    router
}