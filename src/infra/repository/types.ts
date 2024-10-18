import { Book } from "../../domain/book/entity"

export interface IBookCreateRepository{
    handle(book: Book): Promise<Book>
}