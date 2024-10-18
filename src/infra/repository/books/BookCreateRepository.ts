import { EntityManager } from "typeorm"
import { Book } from "../../../domain/book/entity"
import { BookEntity, defaultDataSource } from "../../datasource/database"
import { IBookCreateRepository } from "../types"

export class BookCreateRepository implements IBookCreateRepository{
    async handle(book: Book): Promise<Book>{
        await defaultDataSource.transaction(async (transactionalEntityManager: EntityManager): Promise<void> => {
            await transactionalEntityManager.insert(BookEntity, book)
        })
        return book
    }
}