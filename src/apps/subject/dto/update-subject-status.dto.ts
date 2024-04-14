import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateSubjectStatusDto {
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
