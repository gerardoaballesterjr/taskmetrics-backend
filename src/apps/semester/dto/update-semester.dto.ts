import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSemesterDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
