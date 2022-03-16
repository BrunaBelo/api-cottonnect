import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./category";
import { DonationObject } from "./donation-object";

@Entity("donation_categories")
class DonationCategory {
  @PrimaryColumn()
  id?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @Column()
  donationObjectId: string;

  @Column()
  donationCategoryId: string;

  @OneToMany(() => DonationObject, donationObject => donationObject)
  donationObjects?: DonationObject[];

  @OneToMany(() => Category, category => category)
  categories?: Category[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { DonationCategory };
