import { IsNotEmpty, IsString, IsUUID } from '@libs/core/validator';
import { AdminParamsDTO } from './AdminParamsDTO';

export class UpdateUserDto extends AdminParamsDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}
