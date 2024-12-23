import { IBookCreateRepository } from "@/infra/repository/types"
import { Book } from "@/domain/book/entity"

export class BookCreateService {
    constructor(private readonly bookCreateRepository: IBookCreateRepository) { }

    async handle(book: Book): Promise<Book> {
        const result = this.bookCreateRepository.handle(book)

        if (!result) {
            throw new Error('Book was not created')
        }

        return result
    }
}