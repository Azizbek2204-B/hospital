import { PartialType } from "@nestjs/mapped-types";
import { CreateDepartmentDto } from "./create-department.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsString()
    location: string;
  
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    head_doctor_id?: number;
}
