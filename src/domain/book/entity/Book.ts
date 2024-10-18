import Joi from 'joi'

export class Book {
  private static readonly schema = Joi.object({
    id: Joi.number(),
    title: Joi.string().max(200).required(),
    author: Joi.string().max(100).required(), 
    isbn: Joi.string().max(13).required(), 
    year: Joi.number().required(), 
  })

  id?: number
  author!: string 
  title!: string
  isbn!: string
  year!: number

  constructor(input: Book, validate: boolean | 'partial' = true) {
    if (validate) {
      const schema = Book.schema
      const result = schema.validate(input)

      if (result.error) {
        throw new Error(result.error.message)
      }
    }
    Object.assign(this, input)
  }
}
