import { IBookFetchDataResponse, IBookFetchRepository } from '@/infra/repository'
import { FilterValue, IBookFetchService, OrderValue } from './types'
import { BookEntity } from '@/infra'


export class BookFetchService implements IBookFetchService {

    constructor(private readonly bookFetchRepository: IBookFetchRepository) { }

    async handle(
        filters: FilterValue,
        fields?: (keyof BookEntity)[],
        order?: OrderValue,
        page?: number,
        itemsPerPage?: number,
    ): Promise<IBookFetchDataResponse> {
        const response = await this.bookFetchRepository.handle(filters, fields, order, page, itemsPerPage)
        return response
    }
}