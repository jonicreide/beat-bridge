import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { ExternalProvider } from 'domain/types';

export enum SignInType {
  OAUTH2 = 'oauth2',
  CREDENTIALS = 'credentials',
}

export enum Provider {
  GOOGLE = 'google',
}

export class RegisterInputDto {
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;
}

export class LoginInputDto {
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}

export class LogoutInputDto {
  @IsUUID()
  @ApiProperty()
  public userId: string;
}

export class OAuth2RegisterInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public accessToken: string;

  @IsNumber()
  @ApiProperty()
  public expiresAt: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public refreshToken: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public scopes: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public tokenType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public idToken: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', examples: ['google', 'spotify'] })
  public provider: ExternalProvider;
}

export class SessionInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public userId: string;
}
