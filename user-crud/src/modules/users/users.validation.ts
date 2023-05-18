import { PartialType } from "@nestjs/mapped-types";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(1)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class UserWithoutPassword extends CreateUserDto {
  @Exclude()
  password: string;
}