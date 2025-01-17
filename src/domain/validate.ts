import { Book } from './book/entity'
import { FilterValue } from './book/useCase/types'

export function isEmptyRequestBody(body: Book): boolean {
    return !body || Object.keys(body).length == 0
}

export function getMissingFields(body: Book): string[] {
    const { title, isbn, author, year } = body as Partial<Book>

    const fields = []

    if (isEmptyString(title)) fields.push('title')
    if (isEmptyString(isbn)) fields.push('isbn')
    if (isEmptyString(author)) fields.push('author')
    if (!year) fields.push('year')

    return fields
}

export function isEmptyString(value: string | undefined | null): boolean {
    return !value || value.trim().length === 0
}

export function isArrayNumber(value: string): boolean {
    if (isEmptyString(value)) {
        return false
    }

    const array = value?.split(',')
        .filter(item => item.trim() !== '')
        .map(Number)

    return array && array.length > 0 && array.every(item => !isNaN(item))
}


export function getMissingFilters(filters: FilterValue): string[] {

    const fields: string[] = []

    for (const [key, value] of Object.entries(filters)) {
        if (isEmptyString(value)) {
            fields.push(key)
        }
    }

    return fields
}

export function isInvalidTimestamp(value: string): boolean {
    const date = new Date(value)
    return isNaN(date.getTime())
}