import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Prescription } from "../../prescriptions/models/prescription.model";

interface IMedicationCreationAttr {
  name: string;
  unit_price: number;
  expiry_date: Date;
}

@Table({ tableName: "medications" })
export class Medication extends Model<Medication, IMedicationCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID of the medication" })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: "Paracetamol",
    description: "Name of the medication",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({ example: 0.5, description: "Price per unit in USD" })
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare unit_price: number;

  @ApiProperty({
    example: "2026-01-01",
    description: "Expiry date of the medication",
  })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare expiry_date: Date;

  @HasMany(() => Prescription)
  prescriptions: Prescription[];
}
