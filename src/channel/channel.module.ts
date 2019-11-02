import { Module } from "@nestjs/common";
import { ChannelController } from "./channel.controller";
import { ChannelService } from "./channel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Channel } from "~/channel/channel.entity";
import { AppsModule } from "~/apps/apps.module";

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), AppsModule],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
