import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("donation_objects")
class DonationObject {
    @PrimaryColumn()
    id?: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status?: string;

    @CreateDateColumn()
    created_at?: Date;

    // @ManyToOne(() => Auction, auction => auction)
    // auction?: Auction;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { DonationObject };
