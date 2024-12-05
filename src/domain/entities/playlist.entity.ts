import {
  IsArray,
  IsEnum,
  IsInstance,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { Music } from 'domain/valueObjects/music';
import { MusicApp } from './types';

export class Playlist {
  @IsUUID()
  public id: string;

  @IsString()
  public name: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsArray()
  @IsInstance(Music, { each: true })
  public musics: Music[];

  @IsEnum(MusicApp)
  public musicApp: MusicApp;
}
