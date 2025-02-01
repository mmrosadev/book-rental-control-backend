import { Like, Between, In } from 'typeorm'
import { defaultDataSource } from '@/infra/datasource/database'
import { BookEntity } from '@/infra/datasource/database'
import { IBookFetchQueryParams } from '@/infra/repository/types'
import { BookFetchRepository } from '../BookFetchRepository'

jest.mock('@/infra/datasource/database', () => ({
    defaultDataSource: {
        manager: {
            findAndCount: jest.fn()
        }
    }
}))

describe('BookFetchRepository', () => {
    let bookFetchRepository: BookFetchRepository
    const mockData = [
        {
            title: "Harry Potter and the Philosopher's Stone",
            isbn: '129933439',
            author: 'J.K Rowling',
            year: 1997
        }
    ]

    beforeEach(() => {
        bookFetchRepository = new BookFetchRepository()
        jest.clearAllMocks()
    })

    it('should return books correctly', async () => {

        (defaultDataSource.manager.findAndCount as jest.Mock).mockResolvedValue([mockData, 1])

        const queryParams: IBookFetchQueryParams = {
            order: { createdAt: 'ASC' },
            page: 1,
            itemsPerPage: 10,
            filters: { title: 'Harry' }
        }

        const result = await bookFetchRepository.handle(queryParams)

        expect(defaultDataSource.manager.findAndCount).toHaveBeenCalledWith(BookEntity, expect.objectContaining({
            where: { title: Like('%Harry%') },
            order: { createdAt: 'ASC' },
            skip: 0,
            take: 10
        }))

        expect(result.data).toEqual(mockData)
        expect(result.total).toBe(1)
        expect(result.pages).toBe(1)
    })

    it('should return default values if not found books', async () => {
        (defaultDataSource.manager.findAndCount as jest.Mock).mockResolvedValue([[], 0])

        const queryParams: IBookFetchQueryParams = { page: 1, itemsPerPage: 10 }

        const result = await bookFetchRepository.handle(queryParams)

        expect(result).toEqual({ data: [], page: 0, pages: 0, total: 0 })
    })

    it('should build fillters correctly for dates', () => {
        const filters = { createdAt: '2024-02-01' }
        const where = bookFetchRepository['buildWhere'](filters)

        const startOfDay = new Date('2024-02-01T00:00:00.000Z')
        const endOfDay = new Date('2024-02-01T23:59:59.999Z')

        expect(where.createdAt).toEqual(Between(startOfDay, endOfDay))
    })

    it('should build fillters correctly for ids', () => {
        const filters = { id: '1,2,3' }
        const where = bookFetchRepository['buildWhere'](filters)

        expect(where.id).toEqual(In([1, 2, 3]))
    })

    it('should build fillters correctly for id', () => {
        const filters = { id: '1' }
        const where = bookFetchRepository['buildWhere'](filters)

        expect(where.id).toEqual(In([1]))
    })


    it('should build fillters correctly for author, isbn and title', () => {
        const filters = { author: 'A', isbn: '1234567891011', title: 'X' }
        const where = bookFetchRepository['buildWhere'](filters)

        expect(where.author).toEqual(Like(`%${filters.author}%`))
        expect(where.isbn).toEqual(Like(`%${filters.isbn}%`))
        expect(where.title).toEqual(Like(`%${filters.title}%`))
    })
})
