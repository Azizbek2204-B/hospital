import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";

interface IInvoiceCreationAttr {
  id: number;
  patientId: number;
  total_amount: number;
  invoice_date: Date;
  status: string;
}

@Table({ tableName: "invoices" })
export class Invoice extends Model<Invoice, IInvoiceCreationAttr> {
  
  @ApiProperty({
    description: 'Unique identifier for the invoice',
    example: 1,
  })
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    description: 'ID of the patient associated with the invoice',
    example: 123,
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare patientId: number;

  @ApiProperty({
    description: 'Total amount of the invoice',
    example: 500.75,
  })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  declare total_amount: number;

  @ApiProperty({
    description: 'Date the invoice was generated',
    example: '2025-05-07',
    type: String,
    format: 'date',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare invoice_date: Date;

  @ApiProperty({
    description: 'Current status of the invoice (e.g., paid, pending)',
    example: 'paid',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;
}
