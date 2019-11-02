import {MigrationInterface, QueryRunner} from "typeorm";

export class AddChannelToApps1572681014873 implements MigrationInterface {
    name = 'AddChannelToApps1572681014873'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "channel" ("id" SERIAL NOT NULL, "stringId" character varying NOT NULL, "name" character varying NOT NULL, "appId" integer, CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_91140b6bc4245fe388f934b5ee1" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_91140b6bc4245fe388f934b5ee1"`, undefined);
        await queryRunner.query(`DROP TABLE "channel"`, undefined);
    }

}
