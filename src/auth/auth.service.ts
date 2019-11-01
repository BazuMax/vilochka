import { Injectable } from "@nestjs/common";
import { UsersService } from "~/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UserRO } from "~/users/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserRO> {
    try {
      const user = await this.userService.authenticate(username, pass);
      return { id: user.id, username: user.username };
    } catch {
      return null;
    }
  }

  async findOne(userId: number): Promise<UserRO> {
    const user = await this.userService.findOne({ where: { id: userId } });
    return { id: user.id, username: user.username };
  }

  login(user: Partial<UserRO>): { token: string } {
    const payload = { sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
