import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { City } from "./city";

import { Role } from "./role";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column()
  birth_day: Date;

  @Column()
  cotton_flakes?: number;

  @Column()
  phone_verified: boolean;

  @Column()
  additional_information: string;

  @Column()
  created_at?: Date;

  @Column()
  updated_at?: Date;

  @Column()
  city_id: string;

  @Column()
  role_id: string;

  @ManyToOne(() => City, city => city.users)
  @JoinColumn({ name: "city_id" })
  city?: Role;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: "role_id" })
  role?: Role;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.cotton_flakes = 0;
    }
  }
}
export { User };
