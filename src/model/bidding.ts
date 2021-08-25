import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
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

    @CreateDateColumn()
    createdAt?: Date;

    @Column()
    userId: string;

    @Column()
    auctionId: string;

    @ManyToOne(() => User, user => user.biddings)
    @JoinColumn({ name: "userId" })
    user?: User;

    @ManyToOne(() => Auction, auction => auction.biddings)
    @JoinColumn({ name: "auctionId" })
    auction?: Auction;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.winner = false;
        }
    }
}

export { Bidding };
