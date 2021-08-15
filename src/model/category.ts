import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { DonationCategory } from "./donationCategory";

@Entity("categories")
class Category {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @OneToMany(() => DonationCategory, donationCategory => donationCategory)
    donationCategories?: DonationCategory[];

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Category };
