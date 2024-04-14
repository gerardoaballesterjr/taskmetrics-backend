import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSemesterDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
