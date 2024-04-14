import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  percentage: number;

  @IsString()
  @IsNotEmpty()
  semester: string;
}
