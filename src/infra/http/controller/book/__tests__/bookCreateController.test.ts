import Koa from 'koa'
import { BookCreateService } from "@/domain/book/useCase"
import { bookCreateController } from "../bookCreateController"
import { IBookCreateRepository } from "@/infra/repository"

describe('bookCreateController', () => {
    it('should thrown 400 error when request body is empty', async () => {
        const mockContext = {
            request: {
                body: {},
            },
            response: {},
            throw: jest.fn(),
            status: 0,
            body: null,
        } as unknown as Koa.Context;

        const bookCreateRepository: IBookCreateRepository = {
            handle: jest.fn()
        }

        const bookCreateService = new BookCreateService(bookCreateRepository)
        const controller = bookCreateController(bookCreateService)
        await controller(mockContext)
        expect(mockContext.throw).toHaveBeenCalledWith(400, 'request body must not be empty')
    })

    it('should thrown 400 error when fields of body are empty', async () => {
        const mockContext = {
            request: {
                body: {
                    title: "",
                    isbn: "",
                    author: undefined,
                    year: undefined
                },
            },
            response: {},
            throw: jest.fn(),
            status: 0,
            body: null,
        } as unknown as Koa.Context;

        const bookCreateRepository: IBookCreateRepository = {
            handle: jest.fn()
        }

        const bookCreateService = new BookCreateService(bookCreateRepository)
        const controller = bookCreateController(bookCreateService)
        await controller(mockContext)
        expect(mockContext.throw).toHaveBeenCalledWith(400, 'the following fields must not be empty: title, isbn, author, year')
    })


    it('should return 200 status when fields of body are complete', async () => {
        const book = {
            title: "Harry Potter and the Philosopher's Stone",
            isbn: "129933439",
            author: "J.K Rowling",
            year: 1997
        }

        const mockContext = {
            request: {
                body: book,
            },
            response: book,
            throw: jest.fn(),
            status: 0,
            body: null,
        } as unknown as Koa.Context;

        const bookCreateRepository: IBookCreateRepository = {
            handle: jest.fn().mockResolvedValue(book)
        }

        const bookCreateService = new BookCreateService(bookCreateRepository)
        const controller = bookCreateController(bookCreateService)
        await controller(mockContext)
        expect(mockContext.status).toBe(200)
    })



    it('should return 500 status when book was not created', async () => {
        jest.spyOn(console, 'log').mockImplementation(() => { })

        const book = {
            title: "Harry Potter and the Philosopher's Stone",
            isbn: "129933439",
            author: "J.K Rowling",
            year: 1997
        }

        const mockContext = {
            request: {
                body: book,
            },
        } as unknown as Koa.Context;

        const bookCreateRepository: IBookCreateRepository = {
            handle: jest.fn().mockImplementation(() => {
                throw new Error('Book was not created')
            })
        }


        const bookCreateService = new BookCreateService(bookCreateRepository)
        const controller = bookCreateController(bookCreateService)
        await controller(mockContext)
        expect(mockContext.status).toBe(500)
        expect(mockContext.body).toEqual({ message: 'error create book' })
        jest.restoreAllMocks()
    })
})