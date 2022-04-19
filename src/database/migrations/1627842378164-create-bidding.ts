import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBidding1627842378164 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "biddings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "bidAmount",
            type: "integer",
          },
          {
            name: "winner",
            type: "boolean",
            default: false,
          },
          {
            name: "reject",
            type: "boolean",
            default: false,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "userId",
            type: "uuid",
          },
          {
            name: "auctionId",
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
            name: "fkAuction",
            columnNames: ["auctionId"],
            referencedColumnNames: ["id"],
            referencedTableName: "auctions",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("biddings");
  }
}
