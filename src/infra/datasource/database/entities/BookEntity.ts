import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn({name: 'id'})
  id!: number

  @Column()
  title!: string

  @Column()
  author!: string

  @Column()
  isbn!: string

  @Column()
  year!: number
}