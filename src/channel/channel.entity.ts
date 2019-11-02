import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { App } from "~/apps/app.entity";
import { ChannelRO } from "~/channel/channel.dto";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stringId: string;

  @Column()
  name: string;

  @ManyToOne(type => App, app => app.channels)
  app: App;

  toResponseObject(): ChannelRO {
    const { name, stringId } = this;
    return { name, stringId };
  }
}
