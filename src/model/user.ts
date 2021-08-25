import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Auction } from "./auction";
import { Bidding } from "./bidding";
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
  phoneNumber: string;

  @Column()
  birthDay: Date;

  @Column()
  cottonFlakes?: number;

  @Column()
  phoneVerified: boolean;

  @Column()
  additionalInformation: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @Column()
  cityId: string;

  @Column()
  roleId: string;

  @ManyToOne(() => City, city => city.users)
  @JoinColumn({ name: "cityId" })
  city?: Role;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: "roleId" })
  role?: Role;

  @OneToMany(() => Auction, auction => auction)
  auction?: Auction[];

  @OneToMany(() => Bidding, bidding => bidding.user)
  biddings?: Bidding[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.cottonFlakes = 0;
    }
  }
}
export { User };
