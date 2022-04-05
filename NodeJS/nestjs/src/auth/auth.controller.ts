import { Body, Controller, Post } from '@nestjs/common';
import { ISignUpProps } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  // signup(@Req() req: Request) You can access express Request, not recommended
  signup(@Body() dto: ISignUpProps) {
    console.log({ dto });
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
