import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Bidding } from "./bidding";
import { DonationObject } from "./donation-object";
import { User } from "./user";

@Entity("auctions")
class Auction {
    @PrimaryColumn()
    id?: string;

    @Column()
    closingDate: Date;

    @Column()
    status?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column()
    userId: string;

    @Column()
    donationObjectId: string;

    @OneToOne(() => DonationObject)
    @JoinColumn({name: 'donationObjectId'})
    donationObject?: DonationObject;

    @ManyToOne(() => User, user => user.auctions)
    user?: User;

    @OneToMany(() => Bidding, bidding => bidding.auction)
    biddings?: Bidding[];

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Auction };
