import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAppsToUser1572613433237 implements MigrationInterface {
    name = 'AddAppsToUser1572613433237'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_apps_app" ("userId" integer NOT NULL, "appId" integer NOT NULL, CONSTRAINT "PK_788d6601b1f2c4528194b61afbe" PRIMARY KEY ("userId", "appId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b77e4be6f64aef6819ea75cdad" ON "user_apps_app" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d3f96c12ccde1a610a07f11602" ON "user_apps_app" ("appId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user_apps_app" ADD CONSTRAINT "FK_b77e4be6f64aef6819ea75cdade" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_apps_app" ADD CONSTRAINT "FK_d3f96c12ccde1a610a07f116026" FOREIGN KEY ("appId") REFERENCES "app"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_apps_app" DROP CONSTRAINT "FK_d3f96c12ccde1a610a07f116026"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_apps_app" DROP CONSTRAINT "FK_b77e4be6f64aef6819ea75cdade"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d3f96c12ccde1a610a07f11602"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b77e4be6f64aef6819ea75cdad"`, undefined);
        await queryRunner.query(`DROP TABLE "user_apps_app"`, undefined);
    }

}
