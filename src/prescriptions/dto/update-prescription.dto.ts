import { PartialType } from "@nestjs/mapped-types";
import { CreatePrescriptionDto } from "./create-prescription.dto";
import { IsString, IsDateString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {
  @ApiProperty({
    description: "ID of the medication prescribed",
    example: 101,
  })
  @IsNumber()
  medication_id: number;

  @ApiProperty({
    description: "Dosage of the prescribed medication",
    example: "500mg",
  })
  @IsString()
  dosage: string;

  @ApiProperty({
    description: "Date when the prescription was created",
    example: "2025-05-07",
  })
  @IsDateString()
  prescription_date: Date;

  @ApiProperty({
    description: "ID of the associated medical record",
    example: 1,
  })
  @IsNumber()
  record_id: number;
}
