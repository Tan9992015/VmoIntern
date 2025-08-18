import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty,IsOptional, IsEnum, IsString } from "class-validator";
import { Role } from "src/enum/role.enum";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    role:Role

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string 

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber:string

    @ApiPropertyOptional()
    @IsOptional()
    address:string
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    avatar:string
}

export class UserDtoExt extends PartialType(UserDto) {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty()
    @IsEmail()
    email: string 
}

export class UserAllOptional extends PartialType(UserDto) {

}

export class UpdateRoleDto {

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
    @IsEnum(Role, { message: 'role must be one of: admin, user, seller' })
    role: Role
}