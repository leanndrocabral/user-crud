import { PartialType } from '@nestjs/mapped-types';
import { Exclude, Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(1)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform((params: TransformFnParams) => params.value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class UserWithoutPasswordDto extends CreateUserDto {
  @Exclude()
  password: string;
}


export class QueryParamsDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(1)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform((params: TransformFnParams) => params.value.toLowerCase())
  email: string;
}

export class QueryParamsFiltersDto extends PartialType(QueryParamsDto) { }


export class PaginateParamsDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform((params: TransformFnParams) => Number(params.value))
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform((params: TransformFnParams) => Number(params.value))
  limit: number;
}

export class PaginateParamsFilterDto extends PartialType(PaginateParamsDto) { }