import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { State } from "./state";
import { User } from "./user";

@Entity("cities")
class City {
    @PrimaryColumn()
    id?: string;

    @Column()
    ibge: number;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @Column()
    state_id: string;

    @ManyToOne(() => State, state => state.cities)
    @JoinColumn({ name: "state_id" })
    state?: State;

    @OneToMany(() => User, user => user)
    users?: User[];

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { City };
