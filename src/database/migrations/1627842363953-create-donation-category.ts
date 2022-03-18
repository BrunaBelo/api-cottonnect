import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDonationCategory1627842363953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "donation_categories",
        columns: [
          {
            name: "donationObjectId",
            type: "uuid",
          },
          {
            name: "donationCategoryId",
            type: "uuid",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "fkDonationObject",
            columnNames: ["donationObjectId"],
            referencedColumnNames: ["id"],
            referencedTableName: "donation_objects",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "fkDonationCategory",
            columnNames: ["donationCategoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "categories",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("donation_categories");
  }
}
