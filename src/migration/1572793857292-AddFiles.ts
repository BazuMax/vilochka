import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFiles1572793857292 implements MigrationInterface {
    name = 'AddFiles1572793857292'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "fileName" character varying NOT NULL, "platform" character varying NOT NULL, "arch" character varying NOT NULL, "sha1" character varying NOT NULL, "sha256" character varying NOT NULL, "originalName" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "file"`, undefined);
    }

}
