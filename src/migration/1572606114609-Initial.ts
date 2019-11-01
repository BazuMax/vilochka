import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1572606114609 implements MigrationInterface {
    name = 'Initial1572606114609'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "app" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_9478629fc093d229df09e560aea" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "password" character varying(1024) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "app"`, undefined);
    }

}
