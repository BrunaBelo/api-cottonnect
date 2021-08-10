import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { City } from "./city";

@Entity("states")
class State {
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

  @OneToMany(() => City, city => city)
  cities?: City[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { State };
