import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Doctor } from "../../doctors/models/doctor.model";
import { Room } from "../../rooms/models/room.model";
import { Patient } from "../../patients/models/patient.model";

interface IAdmissionCreationAttr {
  patient_id: number;
  room_id: number;
  doctor_id: number;
  admission_date: Date;
  discharge_date?: Date;
}

@Table({ tableName: 'admissions' })
export class Admission extends Model<Admission, IAdmissionCreationAttr> {

  @ApiProperty({ description: 'Unique identifier for the admission', example: 1 })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ description: 'ID of the patient associated with the admission', example: 123 })
  @ForeignKey(() => Patient)
  @Column({ type: DataType.BIGINT })
  declare patient_id: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ApiProperty({ description: 'ID of the room assigned to the patient during admission', example: 5 })
  @ForeignKey(() => Room)
  @Column({ type: DataType.BIGINT })
  declare room_id: number;

  @BelongsTo(() => Room)
  room: Room;

  @ApiProperty({ description: 'ID of the doctor responsible for the admission', example: 101 })
  @ForeignKey(() => Doctor)
  @Column({ type: DataType.BIGINT })
  declare doctor_id: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

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
