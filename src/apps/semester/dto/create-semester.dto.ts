import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSemesterDto implements Prisma.SemesterCreateInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
