import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { App } from "~/apps/app.entity";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  stringId: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(type => App, app => app.channels)
  app: App;
}
