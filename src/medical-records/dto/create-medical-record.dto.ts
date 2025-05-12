import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateMedicalRecordDto {
  @ApiProperty({
    description: "ID of the patient associated with the medical record",
    example: 123,
  })
  @IsNumber()
  patient_id: number;

  @ApiProperty({
    description: "ID of the doctor associated with the medical record",
    example: 456,
  })
  @IsNumber()
  doctor_id: number;

  @ApiProperty({
    description: "ID of the appointment associated with the medical record",
    example: 789,
  })
  @IsNumber()
  appointment_id: number;

  @ApiProperty({
    description: "Diagnosis provided by the doctor",
    example: "Acute Bronchitis",
  })
  @IsString()
  diagnosis: string;
}
