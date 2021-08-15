import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { DonationObject } from "./donationObject";
import { User } from "./user";

@Entity("auctions")
class Auction {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    closing_data: Date;

    @Column()
    status: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @Column()
    user_id: string;

    @Column()
    donation_object_id: string;

    @ManyToOne(() => User, user => user.auction)
    @JoinColumn({ name: "user_id" })
    user?: User;

    @OneToOne(() => DonationObject, donationObject => donationObject)
    donationObject?: DonationObject;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Auction };
