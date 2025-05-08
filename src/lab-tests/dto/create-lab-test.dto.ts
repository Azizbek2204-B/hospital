import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateLabTestDto {
  @ApiProperty({ example: 101, description: "Associated medical record ID" })
  @IsNumber()
  record_id: number;

  @ApiProperty({
    example: 15,
    description: "Technician ID who performed the test",
  })
  @IsNumber()
  technician_id: number;

  @ApiProperty({ example: "Blood Test", description: "Type of the lab test" })
  @IsString()
  test_type: string;

  @ApiProperty({ example: "2025-05-01", description: "Date of the lab test" })
  @IsDateString()
  test_date: Date;
}
