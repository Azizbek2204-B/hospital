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
import { Department } from "../../departments/models/department.model";
import { LabTest } from "../../lab-tests/models/lab-test.model";

interface IStaffCreationAttr {
  email: string;
  hashed_password: string;
  first_name: string;
  last_name: string;
  phone: string;
  photo:string
  department_id: number;
  role: string;
  salary: number;
  is_active: boolean;
  refresh_token?: string;
}

@Table({ tableName: "staff" })
export class Staff extends Model<Staff, IStaffCreationAttr> {
  @ApiProperty({ example: 1, description: "Xodim ID raqami" })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "Email manzili",
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @ApiProperty({
    example: "hashed_password_123",
    description: "Xashlangan parol",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare hashed_password: string;

  @ApiProperty({ example: "John", description: "Ism" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare first_name: string;

  @ApiProperty({ example: "Doe", description: "Familiya" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare last_name: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @ApiProperty({ example: 2, description: "Bo'lim ID raqami" })
  @ForeignKey(() => Department)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare department_id: number;

  @ApiProperty({ type: () => Department, description: "Tegishli bo‘lim" })
  @BelongsTo(() => Department)
  declare department: Department;

  @ApiProperty({ example: "Photo", description: "Rasm" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare photo: string;

  @ApiProperty({ example: "Hamshira", description: "Lavozimi" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare role: string;

  @ApiProperty({ example: 1200.5, description: "Maosh" })
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare salary: number;

  @ApiProperty({ example: true, description: "Faolmi yoki yo‘q" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @ApiProperty({
    example: null,
    required: false,
    description: "Refresh token (ixtiyoriy)",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare refresh_token: string | null;

  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare activation_link: string;

  @HasMany(() => LabTest)
  labTests: LabTest[];
}
