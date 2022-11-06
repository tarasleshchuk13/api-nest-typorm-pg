import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDefaultValueForTagListInArticle1664140638869
    implements MigrationInterface {
    name = 'AddDefaultValueForTagListInArticle1664140638869'
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "articles" ALTER COLUMN "tagList" SET DEFAULT '[]'`)
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "articles" ALTER COLUMN "tagList" DROP DEFAULT`)
    }
    
}
