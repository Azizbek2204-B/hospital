import { PartialType } from "@nestjs/mapped-types";
import { CreateInvoiceDto } from "./create-invoice.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDateString } from "class-validator";

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
  @ApiProperty({
    description: "Unique identifier for the invoice",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "ID of the patient associated with the invoice",
    example: 123,
  })
  @IsNumber()
  patientId: number;

  @ApiProperty({
    description: "Total amount of the invoice",
    example: 500.75,
  })
  @IsNumber()
  total_amount: number;

  @ApiProperty({
    description: "Date the invoice was generated",
    example: "2025-05-07",
    type: String,
    format: "date",
  })
  @IsDateString()
  invoice_date: Date;

  @ApiProperty({
    description: "Current status of the invoice (e.g., paid, pending)",
    example: "paid",
  })
  @IsString()
  status: string;
}
