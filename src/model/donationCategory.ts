import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./category";
import { DonationObject } from "./donationObject";

@Entity("cities")
class DonationCategory {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at?: Date;

    @Column()
    donation_object_id: string;

    @Column()
    donation_category_id: string;

    @OneToMany(() => DonationObject, donationObject => donationObject)
    donationObjects?: DonationObject[];

    @OneToMany(() => Category, category => category)
    categories?: Category[];

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { DonationCategory };
