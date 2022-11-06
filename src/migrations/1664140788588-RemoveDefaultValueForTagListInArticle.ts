import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveDefaultValueForTagListInArticle1664140788588
    implements MigrationInterface {
    name = 'RemoveDefaultValueForTagListInArticle1664140788588'
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "articles" ALTER COLUMN "tagList" DROP DEFAULT`)
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "articles" ALTER COLUMN "tagList" SET DEFAULT '[]'`)
    }
    
}
