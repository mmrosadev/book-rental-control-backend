import Koa from 'koa'
import { BookFetchService } from '@/domain/book/useCase'
import { bookFetchController } from '../bookFetchController'
import { IBookFetchRepository } from '@/infra/repository'

describe('bookFetchController', () => {

    it('should thrown 400 error when id is not number', async () => {
        const mockContext = {
            query: {
                filters: {
                    id: 'test'
                },
            },
            response: {},
            throw: jest.fn(),
            status: 0,
            body: null,
        } as unknown as Koa.Context

        const bookFetchRepository: IBookFetchRepository = {
            handle: jest.fn()
        }

        const bookFetchService = new BookFetchService(bookFetchRepository)
        const controller = bookFetchController(bookFetchService)
        await controller(mockContext)
        expect(mockContext.throw).toHaveBeenCalledWith(400, 'id must be a valid integer or a comma-separated list of integers.')
    })

    it('should thrown 400 error when id is not a comma-separated list of integers', async () => {
        const mockContext = {
            query: {
                filters: {
                    id: '1,test,test2'
                },
            },
            response: {},
            throw: jest.fn(),
            status: 0,
            body: null,
        } as unknown as Koa.Context

        const bookFetchRepository: IBookFetchRepository = {
            handle: jest.fn()
        }

        const bookFetchService = new BookFetchService(bookFetchRepository)
        const controller = bookFetchController(bookFetchService)
        await controller(mockContext)
        expect(mockContext.throw).toHaveBeenCalledWith(400, 'id must be a valid integer or a comma-separated list of integers.')
    })

    it('should thrown 400 error when filters are empty', async () => {
        const mockContext = {
            query: {
                filters: {
                    author: '',
                    createdAt: '',
                    updatedAt: '',
                    id: '',
                    deletedAt: '',
                },
            },
            response: {},
            throw: jest.fn(),
            status: 0,
            body: null,
        } as unknown as Koa.Context

        const bookFetchRepository: IBookFetchRepository = {
            handle: jest.fn()
        }

        const bookFetchService = new BookFetchService(bookFetchRepository)
        const controller = bookFetchController(bookFetchService)
        await controller(mockContext)
        expect(mockContext.throw).toHaveBeenCalledWith(400, 'the following filters must not be empty: author, createdAt, updatedAt, id, deletedAt.')
    })

    it('should thrown 400 error when createdAt is not a valid timestamp', async () => {
        const mockContext = {
            query: {
                filters: {
                    createdAt: 'test',
                },
            },
            response: {},
            throw: jest.fn(),
            status: 0,
            body: null,
        } as unknown as Koa.Context

        const bookFetchRepository: IBookFetchRepository = {
            handle: jest.fn()
        }

        const bookFetchService = new BookFetchService(bookFetchRepository)
        const controller = bookFetchController(bookFetchService)
        await controller(mockContext)
        expect(mockContext.throw).toHaveBeenCalledWith(400, 'the createdAt filter must be a valid format of timestamp.')
    })

    it('should thrown 400 error when updatedAt is not a valid timestamp', async () => {
        const mockContext = {
            query: {
                filters: {
                    updatedAt: 'test',
                },
            },
            response: {},
            throw: jest.fn(),
            status: 0,
            body: null,
        } as unknown as Koa.Context

        const bookFetchRepository: IBookFetchRepository = {
            handle: jest.fn()
        }

        const bookFetchService = new BookFetchService(bookFetchRepository)
        const controller = bookFetchController(bookFetchService)
        await controller(mockContext)
        expect(mockContext.throw).toHaveBeenCalledWith(400, 'the updatedAt filter must be a valid format of timestamp.')
    })

    it('should thrown 400 error when deletedAt is not a valid timestamp', async () => {
        const mockContext = {
            query: {
                filters: {
                    deletedAt: 'test',
                },
            },
            response: {},
            throw: jest.fn(),
            status: 0,
            body: null,
        } as unknown as Koa.Context

        const bookFetchRepository: IBookFetchRepository = {
            handle: jest.fn()
        }

        const bookFetchService = new BookFetchService(bookFetchRepository)
        const controller = bookFetchController(bookFetchService)
        await controller(mockContext)
        expect(mockContext.throw).toHaveBeenCalledWith(400, 'the deletedAt filter must be a valid format of timestamp.')
    })

    it('should return status 200', async () => {
        const mockContext = {} as unknown as Koa.Context

        const bookFetchRepository: IBookFetchRepository = {
            handle: jest.fn().mockResolvedValue({})
        }

        const bookFetchService = new BookFetchService(bookFetchRepository)
        const controller = bookFetchController(bookFetchService)
        await controller(mockContext)
        expect(mockContext.status).toBe(200)
    })

    it('should return status 500', async () => {
        jest.spyOn(console, 'log').mockImplementation(() => { })
        const mockContext = {} as unknown as Koa.Context

        const bookFetchRepository: IBookFetchRepository = {
            handle: jest.fn().mockImplementation(() => {
                throw new Error('database error')
            })
        }

        const bookFetchService = new BookFetchService(bookFetchRepository)
        const controller = bookFetchController(bookFetchService)
        await controller(mockContext)
        expect(mockContext.status).toBe(500)
        expect(mockContext.body).toEqual({ message: new Error('database error') })
        jest.restoreAllMocks()
    })
})