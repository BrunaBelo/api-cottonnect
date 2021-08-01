import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDonationCategory1627842363953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "donation_categories",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "donation_object_id",
            type: "uuid",
          },
          {
            name: "donation_category_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "fk_donation_object",
            columnNames: ["donation_object_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "donation_objects",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "fk_donation_category",
            columnNames: ["donation_category_id"],
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
