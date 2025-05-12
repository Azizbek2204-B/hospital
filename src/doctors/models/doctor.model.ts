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
import { Appointment } from "../../appointments/models/appointment.model";
import { MedicalRecord } from "../../medical-records/models/medical-record.model";
import { Admission } from "../../admissions/models/admission.model";

interface IDoctorCreationAttr {
  email: string;
  hashed_password: string;
  first_name: string;
  last_name: string;
  phone: string;
  photo: string;
  department_id: number;
  specialization: string;
  consultation_fee: number;
  is_active: boolean;
  refresh_token?: string;
}

@Table({ tableName: "doctors" })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
  @ApiProperty({ description: "Unique identifier for the doctor", example: 1 })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ description: "Email address", example: "doctor@example.com" })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @ApiProperty({ description: "Hashed password", example: "StrongHashed123" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare hashed_password: string;

  @ApiProperty({ description: "First name", example: "John" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare first_name: string;

  @ApiProperty({ description: "Last name", example: "Doe" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare last_name: string;

  @ApiProperty({ description: "Phone number", example: "+1234567890" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @ApiProperty({ example: "Photo", description: "Rasm" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare photo: string;

  @ApiProperty({ example: 2, description: "Department ID" })
  @ForeignKey(() => Department)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare department_id: number;

  @BelongsTo(() => Department)
  @ApiProperty({ type: () => Department })
  declare department: Department;

  @ApiProperty({ description: "Specialization", example: "Cardiology" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare specialization: string;

  @ApiProperty({ description: "Consultation fee", example: 100.5 })
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare consultation_fee: number;

  @ApiProperty({ description: "Is active", example: true })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  declare is_active: boolean;

  @ApiProperty({
    description: "Refresh token",
    required: false,
    example: "refresh_token_sample",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare refresh_token: string;

  @ApiProperty({
    description: "Activation link UUID",
    example: "d290f1ee-6c54-4b01-90e6-d701748f0851",
  })
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare activation_link: string;

  @HasMany(() => Appointment)
  appointments: Appointment[];

  @HasMany(() => MedicalRecord)
  medicalRecords: MedicalRecord[];

  @HasMany(() => Admission)
  admissions: Admission[];

  @HasMany(() => Department)
  departments: Department[];
}
