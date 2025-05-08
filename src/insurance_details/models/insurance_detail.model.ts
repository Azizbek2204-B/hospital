import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model"; // Assuming the Patient model exists

interface IInsuranceDetailCreationAttr {
  patient_id: number;
  provider_name: string;
  expiry_date: Date;
}

@Table({ tableName: "insurance_details" })
export class InsuranceDetail extends Model<InsuranceDetail, IInsuranceDetailCreationAttr> {

  @ApiProperty({
    description: 'Unique identifier for the insurance detail entry',
    example: 1,
  })
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    description: 'ID of the patient associated with the insurance detail',
    example: 123,
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare patient_id: number;

  @ApiProperty({
    description: 'Name of the insurance provider',
    example: 'ABC Health Insurance',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare provider_name: string;

  @ApiProperty({
    description: 'Expiry date of the insurance policy',
    example: '2026-12-31',
    type: String,
    format: 'date',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare expiry_date: Date;
}
