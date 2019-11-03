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
import { APP_INTERCEPTOR, APP_FILTER } from "@nestjs/core";
import { HttpErrorFilter } from "~/shared/http-error.filter";
import { FilesModule } from './files/files.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AppsModule,
    ChannelModule,
    AuthModule,
    UsersModule,
    FilesModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
