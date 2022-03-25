import { IsEmail, IsNotEmpty } from '@libs/core/validator';

export class EmailDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
