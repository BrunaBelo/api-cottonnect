import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
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

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { DonationObject };
