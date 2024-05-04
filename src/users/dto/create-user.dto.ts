import { IsEmail, IsEmpty, IsEnum,IsString } from "class-validator";
export class CreateUserDto{
    @IsString()
    @IsEmpty()
    name:string;
    @IsEmail()
    email:string;
    @IsEnum(["INTERN" , "ADMIN"],{
        message: "valid role require"
    })
    role: "INTERN" | "ADMIN";
}