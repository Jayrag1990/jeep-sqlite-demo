import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstTime1710488399955 implements MigrationInterface {
    name = 'FirstTime1710488399955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Item" (
            "Id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
            "Name" varchar NULL, 
            "Title" varchar NULL
            )
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Item"`);

    }

}
