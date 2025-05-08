import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDepartmentDto {
  @ApiProperty({ example: 'Cardiology', description: 'Name of the department' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2nd Floor, Block B', description: 'Location of the department' })
  @IsString()
  location: string;

  @ApiProperty({ example: 12, required: false, description: 'ID of the head doctor' })
  @IsOptional()
  @IsNumber()
  head_doctor_id?: number;
}
