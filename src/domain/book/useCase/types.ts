import { Book } from '@/domain/book/entity'
import { IBookFetchDataResponse } from '@/infra'

export interface IBookCreateService {
    handle(book: Book): Promise<Book>
}

export interface IBookFetchService {
    handle(
        filters?: FilterValue,
        fields?: (keyof BookResponse)[],
        order?: OrderValue,
        page?: number,
        itemsPerPage?: number,
    ): Promise<IBookFetchDataResponse>
}

export const orderValueFields = ['name', 'author', 'year', 'createdAt', 'updatedAt', 'deleteAt']

export type OrderValue = {
    [key in typeof orderValueFields[number]]?: 'ASC' | 'DESC'
}

export const filterValueFields = ['id', 'author', 'title', 'isbn', 'year']

export type FilterValue = {
    [key in typeof filterValueFields[number]]?: string
}

export interface BookResponse {
    id: number
    author: string
    title: string
    isbn: string
    year: number
}