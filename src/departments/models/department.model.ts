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
import { Doctor } from "../../doctors/models/doctor.model";
import { Staff } from "../../staff/models/staff.model"; // Staff ni import qilish

interface IDepartmentCreationAttr {
  name: string;
  location: string;
  head_doctor_id?: number;
}

@Table({ tableName: "departments" })
export class Department extends Model<Department, IDepartmentCreationAttr> {
  @ApiProperty({ example: 1, description: "Bo'lim ID raqami" })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: "Kardiologiya", description: "Bo'lim nomi" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({ example: "2-qavat, B blok", description: "Bo'lim joylashuvi" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare location: string;

  @ApiProperty({ example: 12, description: "Bo'lim bosh shifokori ID raqami (ixtiyoriy)" })
  @ForeignKey(() => Doctor)
  @Column({ type: DataType.BIGINT, allowNull: true })
  declare head_doctor_id: number;

  @BelongsTo(() => Doctor)
  head_doctor: Doctor;

  @HasMany(() => Staff)
  staff: Staff[];
}
