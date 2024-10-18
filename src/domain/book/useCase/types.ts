import { Book } from "../entity"

export interface IBookCreateService{
    handle(book: Book): Promise<Book>
}