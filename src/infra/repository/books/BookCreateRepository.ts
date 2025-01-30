import { EntityManager } from 'typeorm'
import { Book } from '@/domain/book/entity'
import { BookEntity, defaultDataSource } from '@/infra/datasource/database'
import { IBookCreateRepository } from '@/infra/repository/types'

export class BookCreateRepository implements IBookCreateRepository {
    async handle(book: Book): Promise<Book> {
        return await defaultDataSource.transaction(async (transactionalEntityManager: EntityManager): Promise<Book> => {
            await transactionalEntityManager.insert(BookEntity, book)
            return book
        })
    }
}