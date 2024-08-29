import { Injectable } from '@nestjs/common';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@Injectable()
export class Playlist {
  @IsUUID()
  public id: string;

  @IsString()
  public name: string;

  @IsString()
  @IsOptional()
  public description?: string;
}
