import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdmissionCreationAttr {
  patient_id: number;
  room_id: number;
  doctor_id: number;
  admission_date: Date;
  discharge_date?: Date;
}

@Table({ tableName: 'admissions' })
export class Admission extends Model<Admission, IAdmissionCreationAttr> {

  @ApiProperty({
    description: 'Unique identifier for the admission',
    example: 1,
  })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    description: 'ID of the patient associated with the admission',
    example: 123,
  })
  @Column({ type: DataType.BIGINT })
  declare patient_id: number;

  @ApiProperty({
    description: 'ID of the room assigned to the patient during admission',
    example: 5,
  })
  @Column({ type: DataType.BIGINT })
  declare room_id: number;

  @ApiProperty({
    description: 'ID of the doctor responsible for the admission',
    example: 101,
  })
  @Column({ type: DataType.BIGINT })
  declare doctor_id: number;

  @ApiProperty({
    description: 'The date when the patient was admitted',
    example: '2025-05-07',
    type: String,
    format: 'date',
  })
  @Column({ type: DataType.DATEONLY })
  declare admission_date: Date;

  @ApiProperty({
    description: 'The date when the patient was discharged (if applicable)',
    example: '2025-05-14',
    type: String,
    format: 'date',
    required: false,
  })
  @Column({ type: DataType.DATEONLY, allowNull: true })
  declare discharge_date: Date;
}