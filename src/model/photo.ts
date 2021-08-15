import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { DonationObject } from "./donationObject";

@Entity("photos")
class Photo {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    uri: string;

    @CreateDateColumn()
    created_at?: Date;

    @Column()
    donationObjectId: string;

    @ManyToOne(() => DonationObject, donationObject => donationObject)
    donationObject?: DonationObject;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Photo };
