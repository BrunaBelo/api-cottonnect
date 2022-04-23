import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user";

@Entity("password_verification_code")
class PasswordVerificationCode {
  @PrimaryColumn()
  id?: string;

  @Column()
  used?: boolean;

  @Column()
  code: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => User, user => user.passwordVerificationCode)
  user?: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { PasswordVerificationCode };
