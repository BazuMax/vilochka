import { Controller, Post, UsePipes, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./user.dto";
import { ValidationPipe } from "../shared/validation.pipe";

@Controller("api/users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("register")
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDto) {
    return this.userService.register(data);
  }
}
