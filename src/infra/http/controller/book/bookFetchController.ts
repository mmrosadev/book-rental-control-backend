import Koa from 'koa'
import qs from 'qs'
import { FilterValue, IBookFetchService } from '@/domain/book/useCase/types'
import { IBookFetchQueryParams } from '@/infra/repository'
import { getMissingFilters, isArrayNumber, isInvalidTimestamp } from '@/domain/validate'

export function bookFetchController(service: IBookFetchService) {
    return async function result(
        context: Koa.Context
    ): Promise<void> {

        const query = qs.parse(context.query as unknown as string) as IBookFetchQueryParams
        const id = query?.filters?.id

        if (id && (!isArrayNumber(id) || !Number.isInteger(parseInt(id)))) {
            return context.throw(400, 'id must be a valid integer or a comma-separated list of integers.')
        }

        if (query && query.filters) {
            const missingFilters = getMissingFilters(query.filters as FilterValue)

            if (missingFilters && missingFilters.length > 0) {
                return context.throw(400, `the following filters must not be empty: ${missingFilters.join(', ')}.`)
            }

            const { createdAt, updatedAt, deletedAt } = query.filters
            const timestamps = { createdAt, updatedAt, deletedAt }

            for (const [key, value] of Object.entries(timestamps)) {
                if (value && isInvalidTimestamp(value)) {
                    return context.throw(400, `the ${key} filter must be a valid format of timestamp.`)
                }
            }
        }


        try {
            const response = await service.handle(query)
            context.status = 200
            context.body = response
        } catch (error) {
            console.log({ error })
            context.status = 500
            context.body = { message: error }
        }
    }
}