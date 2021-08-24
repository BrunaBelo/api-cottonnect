import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePhoto1627842343538 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "photos",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "uri",
            type: "varchar",
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
        ],
        foreignKeys: [
          {
            name: "fk_donation_object",
            columnNames: ["donation_object_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "donation_objects",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("photos");
  }
}
