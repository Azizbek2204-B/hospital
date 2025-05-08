import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Department } from "../../departments/models/department.model";

interface IDoctorCreationAttr {
  email: string;
  hashed_password: string;
  first_name: string;
  last_name: string;
  phone: string;
  department_id: number;
  specialization: string;
  consultation_fee: number;
  is_active: boolean;
  refresh_token?: string;
}

@Table({ tableName: 'doctors' })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {

  @ApiProperty({
    description: 'Unique identifier for the doctor',
    example: 1,
  })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    description: 'Email address of the doctor, must be unique',
    example: 'doctor@example.com',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @ApiProperty({
    description: 'Hashed_password for the doctor’s account, should be securely hashed',
    example: 'Stronghashed_password123',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare hashed_password: string;

  @ApiProperty({
    description: 'First name of the doctor',
    example: 'John',
  })
  @Column({ type: DataType.STRING })
  declare first_name: string;

  @ApiProperty({
    description: 'Last name of the doctor',
    example: 'Doe',
  })
  @Column({ type: DataType.STRING })
  declare last_name: string;

  @ApiProperty({
    description: 'Phone number of the doctor',
    example: '+1234567890',
  })
  @Column({ type: DataType.STRING })
  declare phone: string;

  @ApiProperty({
    description: 'The ID of the department the doctor belongs to',
    example: 2,
  })
  @ForeignKey(() => Department)
  @Column({ type: DataType.BIGINT })
  declare department_id: number;

  @ApiProperty({
    description: 'The department the doctor belongs to',
    type: () => Department,
  })
  @BelongsTo(() => Department)
  declare department: Department;

  @ApiProperty({
    description: 'The doctor’s area of expertise or specialization',
    example: 'Cardiology',
  })
  @Column({ type: DataType.STRING })
  declare specialization: string;

  @ApiProperty({
    description: 'The consultation fee charged by the doctor',
    example: 100.50,
  })
  @Column({ type: DataType.DECIMAL(10, 2) })
  declare consultation_fee: number;

  @ApiProperty({
    description: 'Indicates whether the doctor is currently active or not',
    example: true,
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @ApiProperty({
    description: 'Refresh token for maintaining the session, optional field',
    example: 'refresh_token_example',
    required: false,
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare refresh_token: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: boolean;
}