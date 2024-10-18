import Koa from 'koa'
import { Book } from './book/entity'

export function isEmptyRequestBody(context: Koa.Context) {
    const { body } = context.request
    if (!body || Object.keys(body).length == 0) {
        context.throw(400,'request body must not be empty')
    }
}

export function allFieldsFilled(context: Koa.Context) {
    const { body } = context.request
    const { title, isbn, author, year } = body as Book
    
    const missingFields = []

    if (!title) missingFields.push('title')
    if (!isbn) missingFields.push('isbn')
    if (!author) missingFields.push('author')
    if (!year) missingFields.push('year')

    if (missingFields.length > 0) {
        context.throw(400,`The following fields must not be empty: ${missingFields.join(', ')}`)
    }
}