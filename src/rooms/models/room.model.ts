import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Admission } from "../../admissions/models/admission.model";

interface IRoomCreationAttr {
  id: number;
  room_number: string;
  room_type: string;
  rate_per_day: number;
  is_available: boolean;
}

@Table({ tableName: "rooms" })
export class Room extends Model<Room, IRoomCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique identifier for the room" })
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "101A", description: "Room number" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare room_number: string;

  @ApiProperty({ example: "Single", description: "Room type (e.g., Single, Double, Suite)" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare room_type: string;

  @ApiProperty({ example: true, description: "Whether the room is currently available" })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_available: boolean;

  @ApiProperty({ example: 150.00, description: "Daily rate for the room in USD" })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare rate_per_day: number;

  @HasMany(()=>Admission)
  admission:Admission[]
}