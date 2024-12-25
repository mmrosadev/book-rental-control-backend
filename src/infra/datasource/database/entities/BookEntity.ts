import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // CreateDateColumn,
  // UpdateDateColumn,
  // DeleteDateColumn
} from 'typeorm'

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number

  @Column()
  title!: string

  @Column()
  author!: string

  @Column()
  isbn!: string

  @Column()
  year!: number

  // @CreateDateColumn({ name: 'created_at' }) createdAt?: Date

  // @UpdateDateColumn({ name: 'updated_at' }) updatedAt?: Date

  // @DeleteDateColumn({ name: 'deleted_at' }) deletedAt?: Date
}