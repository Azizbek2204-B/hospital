import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDateString } from "class-validator";

export class CreateInsuranceDetailDto {

  @ApiProperty({
    description: 'ID of the patient associated with the insurance detail',
    example: 123,
  })
  @IsNumber()
  patient_id: number;

  @ApiProperty({
    description: 'Name of the insurance provider',
    example: 'ABC Health Insurance',
  })
  @IsString()
  provider_name: string;

  @ApiProperty({
    description: 'Expiry date of the insurance policy',
    example: '2026-12-31',
    type: String,
    format: 'date',
  })
  @IsDateString()
  expiry_date: Date;
}
