import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateBookTable1728773642492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE books (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                author VARCHAR(100) NOT NULL,
                isbn VARCHAR(13) NOT NULL,
                year INT NOT NULL
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE books')
    }
}
