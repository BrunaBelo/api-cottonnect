import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDonationObject1627842336179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "donation_objects",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "status",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "auctionId",
            type: "uuid"
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "fkAuctionId",
            columnNames: ["auctionId"],
            referencedColumnNames: ["id"],
            referencedTableName: "auctions",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("donation_objects");
  }
}
