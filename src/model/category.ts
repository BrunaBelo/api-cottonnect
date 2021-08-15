import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

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

    // @OneToMany(() => DonationCategory, donationCategory => donationCategory)
    // donationCategory?: DonationCategory[];

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Category };
