import Koa from "koa"
import Router from "koa-router"
import bodyParser from "koa-bodyparser"
import { initDatabase } from "./infra/datasource"
import { routesBook } from './infra/http'
import { BookCreateService } from "./domain/book/useCase"
import { BookCreateRepository } from "./infra"

(async function init() {
  await initDatabase()
  
  const PORT = process.env.PORT || 3000
  const app = new Koa()
  const router = new Router()

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
    console.info("Data Source has been initialized!")

  app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`)
  })
})()