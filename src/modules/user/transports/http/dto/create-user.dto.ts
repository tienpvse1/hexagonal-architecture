import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @MinLength(2)
  name: string;
  @IsEmail()
  @ApiProperty()
  email: string;
}
