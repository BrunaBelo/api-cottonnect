import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuction1627842372631 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "auctions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "closing_data",
            type: "timestamp",
          },
          {
            name: "status",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "donation_object_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "fk_user",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "fk_donation_object",
            columnNames: ["donation_object_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "donation_objects",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("auctions");
  }
}
