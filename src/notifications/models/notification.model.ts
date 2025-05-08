import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";

interface INotificationCreationAttr {
  patient_id: number;
  message: string;
  created_at?: Date;
  read?: boolean;
}

@Table({ tableName: "notifications" })
export class Notification extends Model<Notification, INotificationCreationAttr> {

  @ApiProperty({
    description: 'Unique identifier for the notification',
    example: 1,
  })
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    description: 'ID of the patient to whom the notification is related',
    example: 123,
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare patient_id: number;

  @ApiProperty({
    description: 'The patient associated with the notification',
    type: () => Patient,
  })
  @BelongsTo(() => Patient)
  declare patient: Patient;

  @ApiProperty({
    description: 'The content/message of the notification',
    example: 'Your appointment is confirmed for tomorrow.',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare message: string;

  @ApiProperty({
    description: 'The date when the notification was created',
    example: '2025-05-07T10:00:00Z',
    type: String,
    format: 'date-time',
  })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare created_at: Date;

  @ApiProperty({
    description: 'Indicates whether the notification has been read',
    example: false,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare read: boolean;
}
