import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { DonationObject } from "./donation-object";

@Entity("photos")
class Photo {
  @PrimaryColumn()
  id?: string;

  @Column()
  assetId: string;

  @Column()
  publicId: string;

  @Column()
  type: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt?: Date;

  @Column()
  donationObjectId: string;

  @ManyToOne(() => DonationObject, donationObject => donationObject.photos)
  donationObject?: DonationObject;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Photo };
