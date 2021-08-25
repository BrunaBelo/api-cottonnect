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
            name: "closingData",
            type: "timestamp",
          },
          {
            name: "status",
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
            name: "userId",
            type: "uuid",
          },
          {
            name: "donationObjectId",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "fkUser",
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "fkDonationObject",
            columnNames: ["donationObjectId"],
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
