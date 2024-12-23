import { Book } from '@/domain/book/entity'

export interface IBookCreateService {
    handle(book: Book): Promise<Book>
}