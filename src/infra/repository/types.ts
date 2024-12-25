import { Book } from '@/domain/book/entity'
import { FilterValue, OrderValue } from '@/domain/book/useCase/types'
import { BookEntity } from '@/infra/datasource/database/entities'

export interface IBookFetchDataResponse {
    data: Book[]
    page: number
    pages: number
    total: number
}

export interface IBookCreateRepository {
    handle(book: Book): Promise<Book>
}

export interface IBookFetchRepository {
    handle(
        filters: FilterValue,
        fields?: (keyof BookEntity)[],
        order?: OrderValue,
        page?: number,
        itemsPerPage?: number,
    ): Promise<IBookFetchDataResponse>
}