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
import { State } from "./state";

@Entity("cities")
class City {
    @PrimaryColumn()
    id?: string;

    @Column()
    ibge: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @Column()
    state_id: string;

    @ManyToOne(() => State, state => state)
    state: State;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { City };
