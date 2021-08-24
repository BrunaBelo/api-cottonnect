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
            name: "phone_number",
            type: "varchar",
          },
          {
            name: "birth_day",
            type: "timestamp",
          },
          {
            name: "cotton_flakes",
            type: "integer",
            default: 0,
          },
          {
            name: "phone_verified",
            type: "boolean",
            default: false,
          },
          {
            name: "additional_information",
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
            name: "city_id",
            type: "uuid",
          },
          {
            name: "role_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "fk_city",
            columnNames: ["city_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "cities",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
          {
            name: "fk_role",
            columnNames: ["role_id"],
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
