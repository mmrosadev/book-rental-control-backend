import { IBookFetchDataResponse, IBookFetchQueryParams, IBookFetchRepository } from '@/infra/repository'
import { IBookFetchService } from './types'

export class BookFetchService implements IBookFetchService {

    constructor(private readonly bookFetchRepository: IBookFetchRepository) { }

    async handle(
        queryParams: IBookFetchQueryParams
    ): Promise<IBookFetchDataResponse> {

        try {

            const result = await this.bookFetchRepository.handle(queryParams)

            if (!result) {
                throw new Error('failed to fetch books')
            }

            return result

        } catch (error) {
            throw new Error(`${(error instanceof Error ? error.message : 'Unknown error')}`)
        }

    }
}