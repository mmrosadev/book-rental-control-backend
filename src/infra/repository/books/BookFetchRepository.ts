import { BookEntity, defaultDataSource } from '@/infra/datasource/database'
import { IBookFetchDataResponse, IBookFetchQueryParams, IBookFetchRepository } from '@/infra/repository/types'

const defaultReturn = { data: [], page: 0, pages: 0, total: 0 } as IBookFetchDataResponse

export class BookFetchRepository implements IBookFetchRepository {
    async handle(
        queryParams: IBookFetchQueryParams
    ): Promise<IBookFetchDataResponse> {

        let { filters, fields, order, page, itemsPerPage } = queryParams
        page = (page ?? 1) - 1
        itemsPerPage = itemsPerPage ?? 25
        order = order ?? { createdAt: 'DESC' }

        const [data, total] = await defaultDataSource.manager.findAndCount(BookEntity, {
            where: {
                ...filters,
            },
            order,
            skip: page * itemsPerPage,
            take: itemsPerPage,
            select: fields,
        })

        if (total === 0) {
            return defaultReturn
        }

        return {
            data,
            page,
            pages: Math.ceil(total / itemsPerPage),
            total
        }
    }
}