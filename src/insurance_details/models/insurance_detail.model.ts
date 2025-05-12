import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "../../patients/models/patient.model";

interface IInsuranceDetailCreationAttr {
  patient_id: number;
  provider_name: string;
  expiry_date: Date;
}

@Table({ tableName: "insurance_details" })
export class InsuranceDetail extends Model<
  InsuranceDetail,
  IInsuranceDetailCreationAttr
> {
  @ApiProperty({ description: "Unique ID", example: 1 })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ description: "Associated patient ID", example: 123 })
  @ForeignKey(() => Patient)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare patient_id: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ApiProperty({
    description: "Insurance provider name",
    example: "ABC Health Insurance",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare provider_name: string;

  @ApiProperty({
    description: "Expiry date of insurance",
    example: "2026-12-31",
    format: "date",
  })
  @Column({ type: DataType.DATE, allowNull: false })
  declare expiry_date: Date;
}
