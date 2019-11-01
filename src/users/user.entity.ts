import * as bcrypt from "bcryptjs";
import { UserRO } from "./user.dto";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { App } from "~/apps/app.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @Column()
  username: string;

  @Column({ length: 1024 })
  password: string;

  @ManyToMany(type => App, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  apps: App[];

  toResponseObject(): UserRO {
    const { username } = this;
    const responseObject: any = { username };
    return responseObject;
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await this.getHash(this.password);
  }

  async getHash(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
}
