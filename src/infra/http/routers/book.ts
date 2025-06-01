import Router from 'koa-router'
import { bookCreateController } from '@/infra/http/controller/book/bookCreateController'
import { IBookCreateService, IBookFetchService } from '@/domain/book/useCase/types'
import { bookFetchController } from '@/infra/http/controller/book/bookFetchController'

export function routesBook(
    server: Router,
    bookCreateService: IBookCreateService,
    bookFetchService: IBookFetchService,
) {
    server.post('/book', bookCreateController(bookCreateService)),
        server.get('/book', bookFetchController(bookFetchService))
}
