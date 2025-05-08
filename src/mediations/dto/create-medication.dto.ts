import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateMedicationDto {
  @ApiProperty({
    example: "Paracetamol",
    description: "Name of the medication",
  })
  @IsString()
  name: string;

  @ApiProperty({ example: 0.5, description: "Price per unit in USD" })
  @IsNumber()
  unit_price: number;

  @ApiProperty({
    example: "2026-01-01",
    description: "Expiry date of the medication",
  })
  @IsDateString()
  expiry_date: Date;
}
