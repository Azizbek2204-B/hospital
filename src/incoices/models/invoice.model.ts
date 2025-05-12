import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";

interface IInvoiceCreationAttr {
  patientId: number;
  total_amount: number;
  invoice_date: Date;
  status: string;
}

@Table({ tableName: "invoices" })
export class Invoice extends Model<Invoice, IInvoiceCreationAttr> {
  @ApiProperty({ description: "Unique identifier for the invoice", example: 1 })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ description: "Patient ID", example: 123 })
  @ForeignKey(() => Patient)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare patientId: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ApiProperty({ description: "Total amount", example: 500.75 })
  @Column({ type: DataType.DECIMAL, allowNull: false })
  declare total_amount: number;

  @ApiProperty({
    description: "Invoice date",
    example: "2025-05-07",
    format: "date",
  })
  @Column({ type: DataType.DATE, allowNull: false })
  declare invoice_date: Date;

  @ApiProperty({ description: "Status (e.g., paid, pending)", example: "paid" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare status: string;
}
