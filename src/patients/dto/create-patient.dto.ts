import {
  IsString,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePatientDto {
  @ApiProperty({
    description: "Username of the patient, unique value required",
    example: "johndoe",
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: "Email of the patient, unique value required",
    example: "johndoe@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Password of the patient",
    example: "password123",
  })
  @IsString()
  hashed_password: string;

  @ApiProperty({
    description: "First name of the patient",
    example: "John",
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    description: "Last name of the patient",
    example: "Doe",
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    description: "Phone number of the patient",
    example: "+1234567890",
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: "Gender of the patient",
    example: "Male",
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description: "Date of birth of the patient",
    example: "1990-01-01",
  })
  @IsDateString()
  date_of_birth: Date;

  @ApiProperty({
    description: "Indicates if the patient is active",
    example: true,
  })
  // @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    description: "Refresh token for the patient, optional",
    example: "some_refresh_token",
  })
  @IsOptional()
  @IsString()
  refresh_token?: string;
}
