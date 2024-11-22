import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    default: 'example@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
