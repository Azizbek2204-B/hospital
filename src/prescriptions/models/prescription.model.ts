import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { MedicalRecord } from '../../medical-records/models/medical-record.model';
import { Medication } from '../../mediations/models/medication.model';

interface IPrescriptionCreationAttr {
  medication_id: number;
  dosage: string;
  prescription_date: Date;
  record_id: number;
}

@Table({ tableName: 'prescriptions' })
export class Prescription extends Model<Prescription, IPrescriptionCreationAttr> {

  @ApiProperty({
    description: 'Unique identifier for the prescription',
    example: 1,
  })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    description: 'ID of the medication prescribed',
    example: 101,
  })
  @ForeignKey(() => Medication)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare medication_id: number;

  @ApiProperty({
    description: 'Dosage of the prescribed medication',
    example: '500mg',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare dosage: string;

  @ApiProperty({
    description: 'Date when the prescription was created',
    example: '2025-05-07',
  })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare prescription_date: Date;

  @ApiProperty({
    description: 'ID of the associated medical record',
    example: 1,
  })
  @ForeignKey(() => MedicalRecord)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare record_id: number;

  @ApiProperty({ type: () => Medication })
  @BelongsTo(() => Medication)
  declare medication: Medication;

  @ApiProperty({ type: () => MedicalRecord })
  @BelongsTo(() => MedicalRecord)
  declare medical_record: MedicalRecord;
}
