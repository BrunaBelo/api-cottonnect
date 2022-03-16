import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { DonationCategory } from "./donation-category";
import { DonationObject } from "./donation-object";

@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => DonationCategory, donationCategory => donationCategory)
  donationCategories?: DonationCategory[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Category };
