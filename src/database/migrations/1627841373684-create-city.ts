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
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "stateId",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "fkState",
            columnNames: ["stateId"],
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
