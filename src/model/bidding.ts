import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Auction } from "./auction";
import { User } from "./user";

@Entity("biddings")
class Bidding {
  @PrimaryColumn()
  id?: string;

  @Column()
  bidAmount: number;

  @Column()
  winner?: boolean;

  @Column()
  reject?: boolean;

  @Column()
  // valid; insufficientCottons;
  status?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @Column()
  userId: string;

  @Column()
  auctionId: string;

  @ManyToOne(() => User, user => user.biddings)
  user?: User;

  @ManyToOne(() => Auction, auction => auction.biddings)
  auction?: Auction;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.winner = false;
    }
  }
}

export { Bidding };
