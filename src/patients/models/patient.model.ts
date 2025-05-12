import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Admission } from "../../admissions/models/admission.model";
import { InsuranceDetail } from "../../insurance_details/models/insurance_detail.model";
import { Notification } from "../../notifications/models/notification.model";
import { Invoice } from "../../incoices/models/invoice.model";
import { MedicalRecord } from "../../medical-records/models/medical-record.model";
import { Appointment } from "../../appointments/models/appointment.model";

interface IPatientCreationAttr {
  username: string;
  email: string;
  hashed_password: string;
  first_name: string;
  last_name: string;
  photo: string;
  phone: string;
  gender: string;
  date_of_birth: Date;
  is_active: boolean;
  refresh_token?: string;
}

@Table({ tableName: "patients" })
export class Patient extends Model<Patient, IPatientCreationAttr> {
  @ApiProperty({
    description: "Unique identifier for the patient",
    example: 1,
  })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    description: "Username of the patient, unique value required",
    example: "johndoe",
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare username: string;

  @ApiProperty({
    description: "Email of the patient, unique value required",
    example: "johndoe@example.com",
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @ApiProperty({
    description: "Password of the patient",
    example: "password123",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare hashed_password: string;

  @ApiProperty({ example: "Photo", description: "Rasm" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare photo: string;

  @ApiProperty({
    description: "First name of the patient",
    example: "John",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare first_name: string;

  @ApiProperty({
    description: "Last name of the patient",
    example: "Doe",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare last_name: string;

  @ApiProperty({
    description: "Phone number of the patient",
    example: "+1234567890",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @ApiProperty({
    description: "Gender of the patient",
    example: "Male",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare gender: string;

  @ApiProperty({
    description: "Date of birth of the patient",
    example: "1990-01-01",
  })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare date_of_birth: Date;

  @ApiProperty({
    description: "Indicates if the patient is active",
    example: true,
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @ApiProperty({
    description: "Refresh token for the patient, optional",
    example: "some_refresh_token",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare refresh_token: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: boolean;

  @HasMany(() => Appointment)
  appointments: Appointment[];

  @HasMany(() => MedicalRecord)
  medicalRecords: MedicalRecord[];

  @HasMany(() => Invoice)
  invoices: Invoice[];

  @HasMany(() => Notification)
  notifications: Notification[];

  @HasMany(() => InsuranceDetail)
  insuranceDetails: InsuranceDetail[];

  @HasMany(() => Admission)
  admissions: Admission[];
}
