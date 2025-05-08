import { PartialType } from "@nestjs/swagger";
import { CreateNotificationDto } from "./create-notification.dto";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from "class-validator";

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
    @ApiProperty({
        description: 'ID of the patient to whom the notification is related',
        example: 123,
      })
      @IsNumber()
      patient_id: number;
    
      @ApiProperty({
        description: 'The content/message of the notification',
        example: 'Your appointment is confirmed for tomorrow.',
      })
      @IsString()
      message: string;
    
      @ApiProperty({
        description: 'The date when the notification was created',
        example: '2025-05-07T10:00:00Z',
        type: String,
        format: 'date-time',
      })
      @IsOptional()
      @IsDateString()
      created_at?: Date;
    
      @ApiProperty({
        description: 'Indicates whether the notification has been read',
        example: false,
      })
      @IsOptional()
      @IsBoolean()
      read?: boolean;
}
