import { BookEntity, defaultDataSource } from '@/infra/datasource/database'
import { IBookFetchDataResponse, IBookFetchRepository } from '@/infra/repository/types'
import { FilterValue, OrderValue } from '@/domain/book/useCase/types'

const defaultReturn = { data: [], page: 0, pages: 0, total: 0 }

export class BookFetchRepository implements IBookFetchRepository {
    async handle(
        filters: FilterValue,
        fields?: (keyof BookEntity)[],
        order?: OrderValue,
        page?: number,
        itemsPerPage?: number,
    ): Promise<IBookFetchDataResponse> {
        page = (page ?? 1) - 1
        itemsPerPage = itemsPerPage ?? 25
        // order = order ?? { createdAt: 'DESC' }
        order = undefined

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