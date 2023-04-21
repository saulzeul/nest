import { MigrationInterface, QueryRunner } from "typeorm";

export class fileMetadata1669398636660 implements MigrationInterface {
    name = 'fileMetadata1669398636660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "local_files" ("id" int NOT NULL IDENTITY(1,1), "filename" nvarchar(255) NOT NULL, "module" nvarchar(255) NOT NULL, "destination" nvarchar(255) NOT NULL, "path" nvarchar(255) NOT NULL, CONSTRAINT "PK_c0799be7954074ff73c0eaf1922" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status" bit NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" datetime2 NOT NULL CONSTRAINT "DF_c9b5b525a96ddc2c5647d7f7fa5" DEFAULT getdate()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_c9b5b525a96ddc2c5647d7f7fa5"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TABLE "local_files"`);
    }

}
