import Koa from 'koa'
import { IBookFetchService } from '@/domain/book/useCase/types'
import { IBookFetchQueryParams } from '@/infra/repository'

export function bookFetchController(service: IBookFetchService) {
    return async function result(
        context: Koa.Context
    ): Promise<void> {

        const query = context.query as IBookFetchQueryParams

        try {
            const response = await service.handle(query)
            context.status = 200
            context.body = response
        } catch (error) {
            console.log({ error })
            context.status = 500
            context.body = { message: 'error fetching books' }
        }
    }
}