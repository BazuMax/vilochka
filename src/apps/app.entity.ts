import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import { User } from "~/users/user.entity";
import { Channel } from "~/channel/channel.entity";

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

  @ManyToMany(type => User, user => user.apps)
  members: User[];

  @OneToMany(type => Channel, channel => channel.app, {
    cascade: true,
  })
  channels: Channel[];

  toResponseObject() {
    const { name, slug, token, members, channels } = this;
    const responseObject: any = { name, slug, token };

    if (members !== undefined) {
      responseObject.members = members.map(user => user.toResponseObject());
    }

    if (channels !== undefined) {
      responseObject.channels = channels.map(channel =>
        channel.toResponseObject(),
      );
    }

    return responseObject;
  }
}
