import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Auction } from "./auction";
import { Category } from "./category";
import { Photo } from "./photo";

@Entity("donation_objects")
class DonationObject {
  @PrimaryColumn()
  id?: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @OneToMany(() => Photo, photo => photo.donationObject)
  photos?: Photo[];

  @ManyToMany(type => Category)
  @JoinTable({
    name: "donation_categories",
    joinColumns: [{ name: "donationObjectId" }],
    inverseJoinColumns: [{ name: "donationCategoryId" }],
  })
  categories?: Category[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { DonationObject };
