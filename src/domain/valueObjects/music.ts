import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Music {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public author: string;

  @IsString()
  @IsNotEmpty()
  public album: string;

  @IsInt()
  public duration: number;
}
