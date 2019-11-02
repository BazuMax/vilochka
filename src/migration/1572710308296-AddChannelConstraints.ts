import {MigrationInterface, QueryRunner} from "typeorm";

export class AddChannelConstraints1572710308296 implements MigrationInterface {
    name = 'AddChannelConstraints1572710308296'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "UQ_0b0dd72474c94e382317ac5921a" UNIQUE ("stringId")`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "UQ_800e6da7e4c30fbb0653ba7bb6c" UNIQUE ("name")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "UQ_800e6da7e4c30fbb0653ba7bb6c"`, undefined);
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "UQ_0b0dd72474c94e382317ac5921a"`, undefined);
    }

}
