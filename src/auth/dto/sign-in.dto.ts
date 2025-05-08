import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class SignInDto {
  @ApiProperty({ example: "azizbek@gmail.com", description: "Doctor email" })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: "12345678", description: "Doctor password" })
  readonly hashed_password: string;
}
