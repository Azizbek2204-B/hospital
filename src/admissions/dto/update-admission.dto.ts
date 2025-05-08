import { PartialType } from "@nestjs/mapped-types";
import { CreateAdmissionDto } from "./create-admission.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional } from "class-validator";

export class UpdateAdmissionDto extends PartialType(CreateAdmissionDto) {
  @ApiProperty({
    description: "The unique identifier of the patient being admitted.",
    example: 123,
  })
  @IsNumber()
  patient_id: number;

  @ApiProperty({
    description:
      "The unique identifier of the room where the patient is admitted.",
    example: 5,
  })
  @IsNumber()
  room_id: number;

  @ApiProperty({
    description:
      "The unique identifier of the doctor responsible for the patient during admission.",
    example: 101,
  })
  @IsNumber()
  doctor_id: number;

  @ApiProperty({
    description: "The date when the patient was admitted.",
    example: "2025-05-07",
    type: String,
    format: "date",
  })
  @IsDateString()
  admission_date: Date;

  @ApiProperty({
    description: "The date when the patient was discharged (optional).",
    example: "2025-05-14",
    type: String,
    format: "date",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  discharge_date?: Date;
}
