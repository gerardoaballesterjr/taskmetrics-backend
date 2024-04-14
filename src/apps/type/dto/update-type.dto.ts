import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  percentage: number;
}
