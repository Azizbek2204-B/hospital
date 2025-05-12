import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Department } from "../../departments/models/department.model";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { MedicalRecord } from "../../medical-records/models/medical-record.model";

interface IAppointmentCreationAttr {
  patient_id: number;
  doctor_id: number;
  department_id: number;
  appointment_date: Date;
  time_slot: string;
  status: string;
}

@Table({ tableName: "appointments" })
export class Appointment extends Model<Appointment, IAppointmentCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique identifier for the appointment" })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 123, description: "Patient ID" })
  @ForeignKey(() => Patient)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare patient_id: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ApiProperty({ example: 101, description: "Doctor ID" })
  @ForeignKey(() => Doctor)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare doctor_id: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @ApiProperty({ example: 3, description: "Department ID" })
  @ForeignKey(() => Department)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare department_id: number;

  @BelongsTo(() => Department)
  department: Department;

  @ApiProperty({ example: "2025-05-15", description: "Appointment date" })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare appointment_date: Date;

  @ApiProperty({ example: "14:30:00", description: "Time slot for the appointment" })
  @Column({ type: DataType.TIME, allowNull: false })
  declare time_slot: string;

  @ApiProperty({ example: "Scheduled", description: "Status of the appointment" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare status: string;

  @HasMany(()=>MedicalRecord)
  medical_records:MedicalRecord[]
}
