import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { koaSwagger } from 'koa2-swagger-ui'
import serveStatic from 'koa-static'
import path from 'path'
import { initDatabase } from './infra/datasource'
import { routesBook } from './infra/http'
import { BookCreateService } from './domain/book/useCase'
import { BookCreateRepository } from './infra'

(async function init() {

  try {
    await initDatabase()
    console.log('Database initialized')
  } catch (error) {
    console.log('Failure database initilization', error)
  }

  const PORT = process.env.PORT || 3000
  const app = new Koa()
  const router = new Router()

  app.use(serveStatic(path.join(__dirname, '..', 'docs')))

  app.use(
    koaSwagger({
      routePrefix: '/docs',
      swaggerOptions: {
        url: 'openapi.yml',
      },
    })
  )
  app.use(bodyParser())

  const bookCreaterRepository = new BookCreateRepository()
  const bookCreateService = new BookCreateService(bookCreaterRepository)

  routesBook(
    router,
    bookCreateService
  )

  app
    .use(router.routes())
    .use(router.allowedMethods())

  app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`)
  })
})()