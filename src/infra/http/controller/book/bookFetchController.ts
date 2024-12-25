import Koa from 'koa'
import { FilterValue, IBookFetchService, OrderValue } from '@/domain/book/useCase/types'
import { IBookFetchDataResponse } from '@/infra/repository'

export function bookFetchController(service: IBookFetchService) {
    return async function result(
        context: Koa.Context
    ): Promise<void> {

        try {
            const response = await service.handle()
            context.status = 200
            context.body = response
        } catch (error) {
            console.log({ error })
            context.status = 500
            context.body = { message: 'error fetching books' }
        }
    }
}