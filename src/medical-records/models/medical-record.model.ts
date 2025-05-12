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
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Appointment } from "../../appointments/models/appointment.model";
import { LabTest } from "../../lab-tests/models/lab-test.model";
import { Prescription } from "../../prescriptions/models/prescription.model";

interface IMedicalRecordCreationAttr {
  patient_id: number;
  doctor_id: number;
  appointment_id: number;
  diagnosis: string;
}

@Table({ tableName: "medical_records" })
export class MedicalRecord extends Model<MedicalRecord, IMedicalRecordCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID of the medical record" })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 123, description: "Patient ID" })
  @ForeignKey(() => Patient)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare patient_id: number;

  @ApiProperty({ example: 456, description: "Doctor ID" })
  @ForeignKey(() => Doctor)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare doctor_id: number;

  @ApiProperty({ example: 789, description: "Appointment ID" })
  @ForeignKey(() => Appointment)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare appointment_id: number;

  @ApiProperty({ example: "Acute Bronchitis", description: "Diagnosis" })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare diagnosis: string;

  @BelongsTo(() => Patient)
  patient: Patient;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @BelongsTo(() => Appointment)
  appointment: Appointment;

  @HasMany(() => LabTest)
  labTests: LabTest[];

  @HasMany(() => Prescription)
  prescriptions: Prescription[];
}
