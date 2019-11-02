import { Module } from "@nestjs/common";
import { AppsController } from "./apps.controller";
import { AppsService } from "./apps.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { App } from "~/apps/app.entity";
import { UsersModule } from "~/users/users.module";
import { User } from "~/users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([App, User]), UsersModule],
  controllers: [AppsController],
  providers: [AppsService],
})
export class AppsModule {}
