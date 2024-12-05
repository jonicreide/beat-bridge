import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, validate } from 'class-validator';

export class GeneratedOAuthUrlDto {
  @IsUrl()
  @ApiProperty()
  public url!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public state!: string;

  public static instance(url: string, state: string): GeneratedOAuthUrlDto {
    const integrationOAuthDto = new GeneratedOAuthUrlDto();

    integrationOAuthDto.state = state;
    integrationOAuthDto.url = url;

    validate(integrationOAuthDto);

    return integrationOAuthDto;
  }
}

export class ExchangeAuthorizationCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code!: string;
}
