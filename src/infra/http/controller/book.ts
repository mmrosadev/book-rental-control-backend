import Router from "koa-router"
import { bookCreateController } from "@/infra/http/controller/book/bookCreateController"
import { IBookCreateService } from "@/domain/book/useCase/types"

export function routesBook(
    server: Router,
    bookCreateService: IBookCreateService
) {
    server.post('/book', bookCreateController(bookCreateService))
}
