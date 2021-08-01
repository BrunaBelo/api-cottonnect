import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCity1627841373684 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cities",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "ibge",
            type: "integer",
          },
          {
            name: "name",
            type: "varchar",
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
            name: "state_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "fk_state",
            columnNames: ["state_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "states",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cities");
  }
}
