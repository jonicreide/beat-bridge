import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsInstance,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { User } from 'domain/entities/user.entity';
import { Session } from 'domain/valueObjects/session';

export class UserDto {
  @IsUUID()
  @ApiProperty({ type: 'uuid' })
  public userId: string;

  @IsString()
  @ApiProperty()
  public name: string;

  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsString()
  @ApiProperty({ nullable: true })
  public image?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public sessionToken: string;

  @IsDate()
  @ApiProperty({ type: Date })
  public sessionExpires: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Boolean })
  public emailVerified?: Boolean;

  public constructor(user: User) {
    this.userId = user.id;
    this.name = user.name;
    this.email = user.email;
    this.sessionToken = user.session?.sessionToken!;
    this.emailVerified = user.emailVerified;
    this.sessionExpires = user.session?.expires!;
  }
}

export class UserSessionDto {
  @IsUUID()
  @ApiProperty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public sessionToken: string;

  @IsDate()
  @ApiProperty({ type: Date })
  public expires: Date;

  public constructor(userId: string, session: Session) {
    this.userId = userId;
    this.sessionToken = session.sessionToken;
    this.expires = session.expires;
  }
}

const RegisterStatuses = ['ok', 'already-existent'] as const;
export type RegisterStatus = (typeof RegisterStatuses)[number];

export class RegisterResponseDto {
  @IsOptional()
  @IsInstance(UserDto)
  @ApiProperty({ type: () => UserDto, nullable: true })
  user?: UserDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ examples: RegisterStatuses })
  status: RegisterStatus;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  error?: string;

  public constructor(input: {
    status: RegisterStatus;
    user?: UserDto;
    error?: Error;
  }) {
    this.status = input.status;
    this.user = input.user;
    this.error = input.error?.message;
  }
}
