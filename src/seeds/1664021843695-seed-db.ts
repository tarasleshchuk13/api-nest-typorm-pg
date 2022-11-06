import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedDB1664021843695 implements MigrationInterface {
    name = 'SeedDB1664021843695'
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')
        `)
        
        // pass is test1234
        await queryRunner.query(`
            INSERT INTO users (username, email, password)
            VALUES ('foo', 'foo@gmail.com', '$2b$10$i3vLoQVr.2CYId0ZF03wwO9vlL0yegzw2BXgqU1xzP74B8h3mYt4K')
        `)
        
        await queryRunner.query(`
            INSERT INTO articles (slug, title, description, body, "tagList", "authorId")
            VALUES ('first-article', 'First article', 'first article descr', 'forst article body', 'coffee, dragons', 1)
        `)
        
        await queryRunner.query(`
            INSERT INTO articles (slug, title, description, body, "tagList", "authorId")
            VALUES ('second-article', 'second article', 'second article descr', 'second article body', 'coffee, dragons', 1)
        `)
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
    }
    
}
