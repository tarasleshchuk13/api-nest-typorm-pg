import { MigrationInterface, QueryRunner } from "typeorm";

export class UserFolowFolowerSameScheme1664275787794 implements MigrationInterface {
    name = 'UserFolowFolowerSameScheme1664275787794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "followers_following" ("follower_id" integer NOT NULL, "following_id" integer NOT NULL, CONSTRAINT "PK_f972b82272b97666b3ac39088a6" PRIMARY KEY ("follower_id", "following_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b08ec1161648c15a185e07f318" ON "followers_following" ("follower_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c63f1b26efb9537e88120c580a" ON "followers_following" ("following_id") `);
        await queryRunner.query(`ALTER TABLE "followers_following" ADD CONSTRAINT "FK_b08ec1161648c15a185e07f3181" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "followers_following" ADD CONSTRAINT "FK_c63f1b26efb9537e88120c580a0" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "followers_following" DROP CONSTRAINT "FK_c63f1b26efb9537e88120c580a0"`);
        await queryRunner.query(`ALTER TABLE "followers_following" DROP CONSTRAINT "FK_b08ec1161648c15a185e07f3181"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c63f1b26efb9537e88120c580a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b08ec1161648c15a185e07f318"`);
        await queryRunner.query(`DROP TABLE "followers_following"`);
    }

}
