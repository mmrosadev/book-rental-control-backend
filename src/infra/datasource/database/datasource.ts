import { DataSource } from "typeorm"
import { BookEntity } from '@/infra/datasource/database/entities'
import dotenv from 'dotenv'

dotenv.config()

export const defaultDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [BookEntity],
  subscribers: [],
  migrations: ['./src/**/migrations/*.ts'],
})


export async function initDatabase(): Promise<void> {
  await defaultDataSource.initialize()
}

export async function finishDatabase(): Promise<void> {
  await defaultDataSource.destroy()
}