import Koa from 'koa'
import { Book } from '@/domain/book/entity'
import { IBookCreateService } from '@/domain/book/useCase/types'
import { allFieldsFilled, isEmptyRequestBody } from '@/domain/validate'

export function bookCreateController(service: IBookCreateService) {
    return async function result(
        context: Koa.Context
    ): Promise<void> {

        isEmptyRequestBody(context)
        allFieldsFilled(context)

        const body = context.request.body
        const { title, isbn, author, year } = body as Book
        const book = new Book({ title, isbn, author, year })

        try {
            await service.handle(book)
            context.status = 200
        } catch (error) {
            console.log({ error })
            context.status = 500
            context.body = { message: 'error create book' }
        }

    }
}