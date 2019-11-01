import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "~/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "~/auth/constants";
import { LocalStrategy } from "~/auth/local.strategy";
import { JwtStategy } from "~/auth/jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStategy],
  exports: [AuthService],
})
export class AuthModule {}
