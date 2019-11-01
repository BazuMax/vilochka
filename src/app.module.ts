import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppsModule } from "./apps/apps.module";
import { ChannelModule } from "./channel/channel.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import ormconfig from "./ormconfig";
import { PassportModule } from "@nestjs/passport";
import { LoggingInterceptor } from "~/shared/logging.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AppsModule,
    ChannelModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
