import Koa from 'koa'
import { Book } from './book/entity'

export function isEmptyRequestBody(body: Book): boolean {
    return !body || Object.keys(body).length == 0
}

export function getMissingFields(body: Book): string[] {
    const { title, isbn, author, year } = body as Partial<Book>

    const fields = []

    if (!title) fields.push('title')
    if (!isbn) fields.push('isbn')
    if (!author) fields.push('author')
    if (!year) fields.push('year')

    return fields
}

export function isArrayNumber(value: string): boolean {
    const array = value?.split(',')
        .filter(item => item.trim() !== '')
        .map(Number)

    return array && array?.length > 0 && array.every(item => !isNaN(item))
}