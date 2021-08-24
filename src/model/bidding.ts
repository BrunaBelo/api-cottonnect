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
    bid_amount: number;

    @Column()
    winner?: boolean;

    @CreateDateColumn()
    created_at?: Date;

    @Column()
    user_id: string;

    @Column()
    auction_id: string;

    @ManyToOne(() => User, user => user.biddings)
    @JoinColumn({ name: "user_id" })
    user?: User;

    @ManyToOne(() => Auction, auction => auction.biddings)
    @JoinColumn({ name: "auction_id" })
    auction?: Auction;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.winner = false;
        }
    }
}

export { Bidding };
