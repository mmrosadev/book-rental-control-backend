import { IBookFetchQueryParams, IBookFetchRepository } from '@/infra'
import { BookFetchService } from '../BookFetchService'

describe('BookFetchService', () => {
    test('Should throw error when data fetch is empty', () => {
        const bookFetchRepository: IBookFetchRepository = {
            handle: jest.fn().mockReturnValue(undefined)
        }

        const params: IBookFetchQueryParams = {}
        const bookFetchService = new BookFetchService(bookFetchRepository)
        expect(bookFetchService.handle(params)).rejects.toThrow('failed to fetch books')
    })

    test('Should throw error when there is database error', () => {
        const bookFetchRepository: IBookFetchRepository = {
            handle: jest.fn().mockImplementation(() => {
                throw new Error('database error')
            })
        }

        const params: IBookFetchQueryParams = {}
        const bookFetchService = new BookFetchService(bookFetchRepository)
        expect(bookFetchService.handle(params)).rejects.toThrow('database error')
    })

    test('Should return books', async () => {

        const books = {
            data: [
                {
                    id: 1,
                    title: 'meu livro',
                    author: 'may',
                    isbn: '134564',
                    year: 2024,
                    createdAt: '2024-12-25T22:04:11.245Z',
                    updatedAt: '2024-12-25T22:04:11.245Z',
                    deletedAt: null
                },
                {
                    id: 2,
                    title: 'meditacaoes de marco aurelio',
                    author: 'marco aurelio',
                    isbn: '290290',
                    year: 1403,
                    createdAt: '2024-12-25T22:05:59.229Z',
                    updatedAt: '2024-12-25T22:05:59.229Z',
                    deletedAt: null
                },
            ],
            page: 1,
            pages: 2,
            total: 4
        }

        const bookFetchRepository: IBookFetchRepository = {
            handle: jest.fn().mockReturnValue(books)
        }

        const params: IBookFetchQueryParams = {}
        const bookFetchService = new BookFetchService(bookFetchRepository)
        expect(await bookFetchService.handle(params)).toEqual(books)
    })
})