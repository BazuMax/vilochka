import { Module } from "@nestjs/common";
import { ChannelController } from "./channel.controller";
import { ChannelService } from "./channel.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Channel } from "~/channel/channel.entity";
import { AppsModule } from "~/apps/apps.module";
import { FilesModule } from "~/files/files.module";

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), AppsModule, FilesModule],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
