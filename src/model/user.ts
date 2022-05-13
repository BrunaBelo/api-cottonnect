import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Auction } from "./auction";
import { Bidding } from "./bidding";
import { City } from "./city";
import { PasswordVerificationCode } from "./password-verification-code";

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
  cpf: string;

  @Column()
  cottonFlakes?: number;

  @Column()
  confirmedEmail?: boolean;

  @Column()
  phoneVerified?: boolean;

  @Column()
  additionalInformation: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @Column()
  cityId: string;

  @Column()
  roleId?: string;

  @ManyToOne(() => City, city => city.users)
  @JoinColumn({ name: "cityId" })
  city?: City;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: "roleId" })
  role?: Role;

  @OneToMany(() => Auction, auction => auction.user)
  auctions?: Auction[];

  @OneToMany(() => Bidding, bidding => bidding.user)
  biddings?: Bidding[];

  @OneToMany(() => Bidding, bidding => bidding.user)
  passwordVerificationCode?: PasswordVerificationCode[];

  token?: string;
  isAllowed?: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.cottonFlakes = 0;
    }
  }
}
export { User };
