import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "~/users/user.entity";

@Entity()
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  token: string;

  @ManyToMany(type => User)
  members: User[];
}
