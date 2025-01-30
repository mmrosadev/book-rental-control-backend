import { IBookCreateRepository } from '@/infra/repository/types'
import { Book } from '@/domain/book/entity'
import { IBookCreateService } from './types'

export class BookCreateService implements IBookCreateService {
    constructor(private readonly bookCreateRepository: IBookCreateRepository) { }

    async handle(book: Book): Promise<Book> {
        try {
            const result = await this.bookCreateRepository.handle(book)

            if (!result) {
                throw new Error('book was not created')
            }

            return result
        } catch (error) {
            throw new Error(`Faleid to create book: ${(error instanceof Error ? error.message : 'Unknown error')}`)
        }
    }
}