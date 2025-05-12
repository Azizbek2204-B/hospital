import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { MedicalRecord } from "../../medical-records/models/medical-record.model";
import { Staff } from "../../staff/models/staff.model"; // Staff modelini import qilish

interface ILabTestCreationAttr {
  record_id: number;
  technician_id: number;
  test_type: string;
  test_date: Date;
}

@Table({ tableName: "lab_tests" })
export class LabTest extends Model<LabTest, ILabTestCreationAttr> {
  @ApiProperty({ description: "Laboratoriya tahlil ID raqami", example: 1 })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ description: "Tibbiy yozuv (medical record) ID raqami", example: 101 })
  @ForeignKey(() => MedicalRecord)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare record_id: number;

  @BelongsTo(() => MedicalRecord)
  medicalRecord: MedicalRecord;

  @ApiProperty({ description: "Texnik xodim ID raqami", example: 15 })
  @ForeignKey(() => Staff)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare technician_id: number;

  @BelongsTo(() => Staff)
  technician: Staff;

  @ApiProperty({ description: "Tahlil turi", example: "Qon tahlili" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare test_type: string;

  @ApiProperty({ description: "Tahlil olingan sana", example: "2025-05-01" })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare test_date: Date;
}