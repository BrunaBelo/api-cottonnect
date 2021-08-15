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
            name: "bid_amount",
            type: "integer",
          },
          {
            name: "winner",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "auction_id",
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
            name: "fk_auction_id",
            columnNames: ["auction_id"],
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
