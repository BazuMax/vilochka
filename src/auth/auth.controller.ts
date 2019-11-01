import { Controller, UseGuards, Post, Request, Get } from "@nestjs/common";
import { AuthService } from "~/auth/auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Request() req): { token: string } {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard())
  @Get("me")
  me(@Request() req) {
    return req.user;
  }
}
