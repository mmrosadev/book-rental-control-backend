import Koa from 'koa'
import { Book } from '@/domain/book/entity'
import { IBookCreateService } from '@/domain/book/useCase/types'
import { getMissingFields, isEmptyRequestBody } from '@/domain/validate'

export function bookCreateController(service: IBookCreateService) {
    return async function result(
        context: Koa.Context
    ): Promise<void> {

        const { request } = context
        const body = request.body as Book

        if (isEmptyRequestBody(body)) {
            context.throw(400, 'request body must not be empty')
        }

        const missingFields = getMissingFields(body)

        if (missingFields.length > 0) {
            return context.throw(400, `the following fields must not be empty: ${missingFields.join(', ')}`)
        }

        const { title, isbn, author, year } = body
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