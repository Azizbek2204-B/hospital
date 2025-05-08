import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Appointment } from "../../appointments/models/appointment.entity";

interface IMedicalRecordCreationAttr {
  patient_id: number;
  doctor_id: number;
  appointment_id: number;
  diagnost: string;
}

@Table({ tableName: "medical_records" })
export class MedicalRecord extends Model<MedicalRecord, IMedicalRecordCreationAttr> {

  @ApiProperty({
    description: 'Unique identifier for the medical record',
    example: 1,
  })
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    description: 'ID of the patient associated with the medical record',
    example: 123,
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare patient_id: number;

  @ApiProperty({
    description: 'ID of the doctor associated with the medical record',
    example: 456,
  })
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare doctor_id: number;

  @ApiProperty({
    description: 'ID of the appointment associated with the medical record',
    example: 789,
  })
  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare appointment_id: number;

  @ApiProperty({
    description: 'Diagnosis provided by the doctor',
    example: 'Acute Bronchitis',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare diagnost: string;
}
