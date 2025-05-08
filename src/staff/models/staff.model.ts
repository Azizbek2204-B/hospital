import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Department } from "../../departments/models/department.model";

interface IStaffCreationAttr {
  email: string;
  hashed_password: string;
  first_name: string;
  last_name: string;
  phone: string;
  department_id: number;
  role: string;
  salary: number;
  is_active: boolean;
  refresh_token?: string;
}

@Table({ tableName: "staff" })
export class Staff extends Model<Staff, IStaffCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique identifier for the staff member" })
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "john.doe@example.com", description: "Email address of the staff member" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @ApiProperty({ example: "hashed_password_123", description: "Hashed password for login" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare hashed_password: string;

  @ApiProperty({ example: "John", description: "First name of the staff member" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare first_name: string;

  @ApiProperty({ example: "Doe", description: "Last name of the staff member" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare last_name: string;

  @ApiProperty({ example: "+998901234567", description: "Phone number of the staff member" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @ApiProperty({ example: 2, description: "Department ID to which the staff belongs" })
  @ForeignKey(() => Department)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare department_id: number;

  @ApiProperty({ type: () => Department, description: "Associated department object" })
  @BelongsTo(() => Department)
  declare department: Department;

  @ApiProperty({ example: "Nurse", description: "Role/position of the staff" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare role: string;

  @ApiProperty({ example: 1200.50, description: "Salary amount" })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare salary: number;

  @ApiProperty({ example: true, description: "Active status of the staff" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  @ApiProperty({ example: null, required: false, description: "Refresh token for session management" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare refresh_token: string | null;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: boolean;
}