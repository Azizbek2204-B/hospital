import { PartialType } from "@nestjs/swagger";
import { CreateDoctorDto } from "./create-doctor.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @ApiProperty({
    description: "Email address of the doctor, must be unique",
    example: "doctor@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Password for the doctor’s account, should be securely hashed",
    example: "StrongPassword123",
  })
  @IsString()
  hashed_password: string;

  @ApiProperty({
    description: "First name of the doctor",
    example: "John",
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    description: "Last name of the doctor",
    example: "Doe",
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    description: "Phone number of the doctor",
    example: "+1234567890",
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: "The ID of the department the doctor will belong to",
    example: 2,
  })
  @IsNumber()
  department_id: number;

  @ApiProperty({
    description: "The doctor’s area of expertise or specialization",
    example: "Cardiology",
  })
  @IsString()
  specialization: string;

  @ApiProperty({
    description: "The consultation fee charged by the doctor",
    example: 100.5,
  })
  @IsNumber()
  consultation_fee: number;

  @ApiProperty({
    description: "Indicates whether the doctor is active or not",
    example: true,
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    description: "Refresh token for maintaining the session, optional field",
    example: "refresh_token_example",
    required: false,
  })
  @IsOptional()
  @IsString()
  refresh_token?: string;
}
