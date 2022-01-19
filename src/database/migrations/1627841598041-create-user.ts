import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1627841598041 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
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
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "phoneNumber",
            type: "varchar",
          },
          {
            name: "cpf",
            type: "varchar",
          },
          {
            name: "cottonFlakes",
            type: "integer",
            default: 0,
          },
          {
            name: "phoneVerified",
            type: "boolean",
            default: false,
          },
          {
            name: "additionalInformation",
            type: "varchar",
            isNullable: true,
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
            name: "cityId",
            type: "uuid",
          },
          {
            name: "roleId",
            type: "uuid",
          }
        ],
        foreignKeys: [
          {
            name: "fkCity",
            columnNames: ["cityId"],
            referencedColumnNames: ["id"],
            referencedTableName: "cities",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
          {
            name: "fkRole",
            columnNames: ["roleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
