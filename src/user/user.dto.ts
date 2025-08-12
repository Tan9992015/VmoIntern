import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty,IsOptional, IsEnum } from "class-validator";
import { Role } from "src/enum/role.enum";
import { Transform } from "class-transformer";

export class UserDto {
    @IsOptional()
    role:Role

    @IsNotEmpty()
    name:string 

    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string

    @IsOptional()
    phoneNumber:string

    @IsOptional()
    address:string
    
    @IsOptional()
    avatar:string
}

export class UserDtoExt extends PartialType(UserDto) {
    @IsNotEmpty()
    password: string

    @IsEmail()
    email: string 
}

export class UserAllOptional extends PartialType(UserDto) {

}

export class UpdateRoleDto {
    @Transform(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
    @IsEnum(Role, { message: 'role must be one of: admin, user, seller' })
    role: Role
}