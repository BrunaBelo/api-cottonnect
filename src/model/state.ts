import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { State };
