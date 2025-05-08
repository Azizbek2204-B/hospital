import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Department } from '../../departments/models/department.model';

interface IAppointmentCreationAttr {
  patient_id: number;
  doctor_id: number;
  department_id: number;
  appointment_date: Date;
  time_slot: string;
  status: string;
}

@Table({ tableName: 'appointments' })
export class Appointment extends Model<Appointment, IAppointmentCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique identifier for the appointment' })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 5, description: 'ID of the patient' })
  @Column({ type: DataType.BIGINT })
  declare patient_id: number;

  @ApiProperty({ example: 3, description: 'ID of the doctor' })
  @Column({ type: DataType.BIGINT })
  declare doctor_id: number;

  @ApiProperty({ example: 2, description: 'Department ID' })
  @ForeignKey(() => Department)
  @Column({ type: DataType.BIGINT })
  declare department_id: number;

  @ApiProperty({ example: '2025-05-15', description: 'Appointment date' })
  @Column({ type: DataType.DATEONLY })
  declare appointment_date: Date;

  @ApiProperty({ example: '14:30:00', description: 'Time slot for the appointment' })
  @Column({ type: DataType.TIME })
  declare time_slot: string;

  @ApiProperty({ example: 'Scheduled', description: 'Status of the appointment' })
  @Column({ type: DataType.STRING })
  declare status: string;
}