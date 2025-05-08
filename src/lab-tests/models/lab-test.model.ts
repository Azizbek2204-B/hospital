import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface ILabTestCreationAttr {
  record_id: number;
  technician_id: number;
  test_type: string;
  test_date: Date;
}

@Table({ tableName: "lab_tests" })
export class LabTest extends Model<LabTest, ILabTestCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID of the lab test" })
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 101, description: "Associated medical record ID" })
  @Column({ type: DataType.BIGINT })
  declare record_id: number;

  @ApiProperty({
    example: 15,
    description: "Technician ID who performed the test",
  })
  @Column({ type: DataType.BIGINT })
  declare technician_id: number;

  @ApiProperty({ example: "Blood Test", description: "Type of the lab test" })
  @Column({ type: DataType.STRING })
  declare test_type: string;

  @ApiProperty({ example: "2025-05-01", description: "Date of the lab test" })
  @Column({ type: DataType.DATEONLY })
  declare test_date: Date;
}
