import { IsNotEmpty, MaxLength, IsString } from 'class-validator';

export class UpdateWordDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  str: string;

  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  meaning: string;
}
