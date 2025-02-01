import { EntityManager } from 'typeorm'
import { Book } from '@/domain/book/entity'
import { BookEntity, defaultDataSource } from '@/infra/datasource'
import { BookCreateRepository } from '../BookCreateRepository'

jest.mock('@/infra/datasource/database', () => ({
    defaultDataSource: {
        transaction: jest.fn()
    }
}))

describe('BookCreateRepository', () => {

    let bookCreateRepository: BookCreateRepository
    let transactionalEntityManager: EntityManager

    beforeEach(() => {
        bookCreateRepository = new BookCreateRepository()
        transactionalEntityManager = {
            insert: jest.fn()
        } as unknown as EntityManager
    })

    test('should call transation', async () => {
        (defaultDataSource.transaction as jest.Mock).mockImplementation(async (callback) => {
            return callback(transactionalEntityManager)
        })

        const book: Book = {
            title: "Harry Potter and the Philosopher's Stone",
            isbn: '129933439',
            author: 'J.K Rowling',
            year: 1997
        }

        const result = await bookCreateRepository.handle(book)
        expect(transactionalEntityManager.insert).toHaveBeenCalledWith(BookEntity, book)
        expect(result).toEqual(book)
    })
})