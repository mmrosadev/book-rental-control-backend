import Router from "koa-router"
import { BookCreateService } from "../../../domain/book/useCase"
import { bookCreateController } from "./book/bookCreateController"
import { IBookCreateService } from "../../../domain/book/useCase/types"

export function routesBook(
    server: Router,
    bookCreateService: IBookCreateService
){
    server.post('/book', bookCreateController(bookCreateService))
}
