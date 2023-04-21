import { MigrationInterface, QueryRunner } from "typeorm";

export class FileMimeData1682110910100 implements MigrationInterface {
    name = 'FileMimeData1682110910100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "local_files" ADD "mimetype" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "local_files" DROP COLUMN "mimetype"`);
    }

}
