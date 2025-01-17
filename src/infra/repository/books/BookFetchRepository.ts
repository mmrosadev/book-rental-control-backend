import { FilterValue } from '@/domain/book/useCase/types'
import { BookEntity, defaultDataSource } from '@/infra/datasource/database'
import { IBookFetchDataResponse, IBookFetchQueryParams, IBookFetchRepository } from '@/infra/repository/types'
import { Between, FindOptionsWhere, In, Like } from 'typeorm'

const defaultReturn = { data: [], page: 0, pages: 0, total: 0 } as IBookFetchDataResponse

export class BookFetchRepository implements IBookFetchRepository {
    async handle(
        queryParams: IBookFetchQueryParams
    ): Promise<IBookFetchDataResponse> {

        let { order, page, itemsPerPage } = queryParams
        const { filters, fields } = queryParams
        page = (page ?? 1) - 1
        itemsPerPage = itemsPerPage ?? 25
        order = order ?? { createdAt: 'ASC' }

        const where: FindOptionsWhere<BookEntity> = this.buildWhere(filters)

        const [data, total] = await defaultDataSource.manager.findAndCount(BookEntity, {
            where,
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

    private buildWhere(filters?: FilterValue): FindOptionsWhere<BookEntity> {

        const where: FindOptionsWhere<BookEntity> = {}

        if (!filters) return {}

        for (const [key, value] of Object.entries(filters)) {
            if (['author', 'isbn', 'title'].includes(key) && typeof value === 'string') {
                if (key === 'author' || key === 'title' || key === 'isbn') {
                    where[key] = Like(`%${value}%`)
                }
            }

            if (['createdAt', 'updatedAt', 'deletedAt'].includes(key) && typeof value === 'string') {
                if (key === 'createdAt' || key === 'updatedAt' || key === 'deletedAt') {
                    const startOfDay = new Date(value)
                    const endOfDay = new Date(startOfDay)
                    endOfDay.setUTCHours(23, 59, 59, 999)
                    where[key] = Between(startOfDay, endOfDay)
                }
            }

            if (key === 'id') {
                const ids = value?.split(',').map(Number)

                if (ids && ids.length > 0 && ids.every(item => !isNaN(item))) {
                    where[key] = In(ids)
                } else if (typeof value === 'string' && !isNaN(parseInt(value))) {
                    where[key] = parseInt(value)
                }

            }
        }

        return where
    }
}