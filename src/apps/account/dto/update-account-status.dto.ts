import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateAccountStatusDto {
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}
