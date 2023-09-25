import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableStatusUser1687373730679 implements MigrationInterface {
    name = 'NullableStatusUser1687373730679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "local_files" ("id" int NOT NULL IDENTITY(1,1), "filename" nvarchar(255) NOT NULL, "module" nvarchar(255) NOT NULL, "destination" nvarchar(255) NOT NULL, "path" nvarchar(255) NOT NULL, "mimetype" nvarchar(255) NOT NULL, CONSTRAINT "PK_c0799be7954074ff73c0eaf1922" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status" bit NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TABLE "local_files"`);
    }

}
