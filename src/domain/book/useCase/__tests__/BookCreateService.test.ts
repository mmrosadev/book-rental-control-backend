import { BookCreateService } from '@/domain/book/useCase/BookCreateService'
import { IBookCreateRepository } from '@/infra'
import { Book } from '@/domain/book/entity'

describe('BookCreateService', () => {
    test('Should throw an error if the book was not created', async () => {

        const bookCreateRepository: IBookCreateRepository = {
            handle: jest.fn().mockImplementation(() => {
                throw new Error('database error')
            })
        }

        const bookCreateService = new BookCreateService(bookCreateRepository)
        const book = new Book({ author: 'Stalone', isbn: '1234567891011', title: 'Rocky Balboa', year: 2016 })
        expect(bookCreateService.handle(book)).rejects.toThrow('database error')

    })

    test('Should throw an error if the book was not returned', async () => {

        const bookCreateRepository: IBookCreateRepository = {
            handle: jest.fn().mockReturnValue(undefined)
        }

        const bookCreateService = new BookCreateService(bookCreateRepository)
        const book = new Book({ author: 'Stalone', isbn: '1234567891011', title: 'Rocky Balboa', year: 2016 })
        expect(bookCreateService.handle(book)).rejects.toThrow('book was not created')

    })

    test('Should return book was not returned', async () => {

        const book = new Book({ author: 'Stalone', isbn: '1234567891011', title: 'Rocky Balboa', year: 2016 })
        const bookCreateRepository: IBookCreateRepository = {
            handle: jest.fn().mockReturnValue(book)
        }

        const bookCreateService = new BookCreateService(bookCreateRepository)
        expect(await bookCreateService.handle(book)).toEqual(book)
    })
})