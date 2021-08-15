import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Auction } from "./auction";
import { DonationCategory } from "./donationCategory";
import { Photo } from "./photo";

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

    @OneToMany(() => Photo, photo => photo)
    photos?: Photo[];

    @OneToMany(() => DonationCategory, donationCategory => donationCategory)
    donationCategories?: DonationCategory[];

    @OneToOne(() => Auction, auction => auction)
    auction?: Auction;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { DonationObject };
