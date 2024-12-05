import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OAuth2RegisterInputDto } from 'application/dtos/auth.dto';
import { RegisterResponseDto } from 'application/dtos/user.dto';
import { UserService } from 'application/services/user.service';

@ApiTags('auth')
@Controller('beatbridge/v1/auth')
export class AuthController {
  @Inject()
  private readonly userService: UserService;

  @Post('logout')
  public async logout(@Body() { userId }: { userId: string }): Promise<void> {
    return this.userService.logout(userId);
  }

  @Post('oauth2/register')
  public async oAuth2Register(
    @Body() oAuth2RegisterInputDto: OAuth2RegisterInputDto,
  ): Promise<RegisterResponseDto> {
    // Receive cookies and check more things if needed.
    return this.userService.registerWithOAuth2(oAuth2RegisterInputDto);
  }

  // session
  @Get('session')
  public async session(): Promise<void> {}
}
