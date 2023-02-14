import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1669634207434 implements MigrationInterface {
    name = 'migration1669634207434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rank\` ADD \`walletCreatedAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rank\` DROP COLUMN \`walletCreatedAt\``);
    }

}
