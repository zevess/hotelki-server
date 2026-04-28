import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class UserDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  username: string;

  @Expose()
  @IsBoolean()
  isVerified: boolean;

  @Expose()
  @IsString()
  avatar: string;

  @Expose()
  @IsString()
  role: string;
}
