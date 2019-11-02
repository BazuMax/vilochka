import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Channel } from "~/channel/channel.entity";
import { AppsModule } from "~/apps/apps.module";

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), AppsModule],
})
export class ChannelModule {}
