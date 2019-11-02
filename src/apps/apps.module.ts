import { Module } from "@nestjs/common";
import { AppsController } from "./apps.controller";
import { AppsService } from "./apps.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { App } from "~/apps/app.entity";
import { UsersModule } from "~/users/users.module";
import { User } from "~/users/user.entity";
import { Channel } from "~/channel/channel.entity";

@Module({
  imports: [TypeOrmModule.forFeature([App, User, Channel]), UsersModule],
  controllers: [AppsController],
  providers: [AppsService],
})
export class AppsModule {}
