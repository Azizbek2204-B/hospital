import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffDto } from './create-staff.dto';
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
    @ApiProperty({ example: "john.doe@example.com", description: "Email address of the staff member" })
      @IsEmail()
      email: string;
    
      @ApiProperty({ example: "securePassword123", description: "Password for staff login" })
      @IsString()
      hashed_password: string;
    
      @ApiProperty({ example: "John", description: "First name of the staff member" })
      @IsString()
      first_name: string;
    
      @ApiProperty({ example: "Doe", description: "Last name of the staff member" })
      @IsString()
      last_name: string;
    
      @ApiProperty({ example: "+998901234567", description: "Phone number of the staff member" })
      @IsPhoneNumber()
      phone: string;
    
      @ApiProperty({ example: 2, description: "ID of the department the staff belongs to" })
      @IsNumber()
      department_id: number;
    
      @ApiProperty({ example: "Nurse", description: "Role of the staff member (e.g., Doctor, Nurse, Admin)" })
      @IsString()
      role: string;
    
      @ApiProperty({ example: 1200.50, description: "Monthly salary in USD" })
      @IsNumber()
      salary: number;
    
      @ApiProperty({ example: true, description: "Whether the staff member is currently active" })
      @IsBoolean()
      is_active: boolean;
    
      @ApiProperty({ example: null, required: false, description: "Refresh token for authentication" })
      @IsOptional()
      @IsString()
      refresh_token?: string;
}
