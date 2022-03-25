import { DisposableEmailCheck } from '@app/_support/decorators';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsUnique,
  MaxLength,
  MinLength,
} from '@libs/core/validator';

export class RegiserDTO {
  @IsEmail()
  @IsNotEmpty()
  @IsUnique({ table: 'users', column: 'email' })
  @DisposableEmailCheck()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  @IsPhoneNumber('IN', {
    message: 'Please enter a valid phone number with country code',
  })
  contact: string;

  @IsNumber()
  @IsIn([1, 2])
  type: number;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  confirmpassword: string;
}
