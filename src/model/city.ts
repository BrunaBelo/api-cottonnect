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
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column()
  stateId: string;

  @ManyToOne(() => State, state => state.cities)
  @JoinColumn({ name: "stateId" })
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
