import { Module } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Channel } from "~/channel/channel.entity";
import { AppsModule } from "~/apps/apps.module";

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), AppsModule],
  providers: [ChannelService],
})
export class ChannelModule {}
