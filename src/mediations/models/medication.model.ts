import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface IMedicationCreationAttr {
  name: string;
  unit_price: number;
  expiry_date: Date;
}

@Table({ tableName: 'medications' })
export class Medication extends Model<Medication, IMedicationCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique ID of the medication' })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 'Paracetamol', description: 'Name of the medication' })
  @Column({ type: DataType.STRING })
  declare name: string;

  @ApiProperty({ example: 0.50, description: 'Price per unit in USD' })
  @Column({ type: DataType.DECIMAL(10, 2) })
  declare unit_price: number;

  @ApiProperty({ example: '2026-01-01', description: 'Expiry date of the medication' })
  @Column({ type: DataType.DATEONLY })
  declare expiry_date: Date;
}