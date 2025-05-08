import {
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IDepartmentCreationAttr {
  name: string;
  location: string;
  head_doctor_id?: number;
}

@Table({ tableName: "departments" })
export class Department extends Model<Department, IDepartmentCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID for the department" })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: "Cardiology", description: "Name of the department" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({
    example: "2nd Floor, Block B",
    description: "Location of the department",
  })
  @Column({ type: DataType.STRING })
  declare location: string;

  @ApiProperty({ example: 12, description: "ID of the head doctor (optional)" })
  @Column({ type: DataType.BIGINT, allowNull: true })
  declare head_doctor_id: number;
}
