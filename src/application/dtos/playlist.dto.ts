import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MusicApp } from 'domain/entities/types';

export class PlaylistDto {
  @ApiProperty({
    description:
      'The integration ID in which the current playlist is attached to.',
    type: String,
  })
  public integrationId: string;

  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  public thumbnail?: string;

  @ApiProperty({
    description: 'The platform the paylist belongs to.',
    example: 'spotify',
    enum: MusicApp,
    enumName: 'MusicApp',
  })
  @IsEnum(MusicApp)
  public source: MusicApp;
}

export class PlaylistInputDto {
  public sourcePlaylistId: string;
}
