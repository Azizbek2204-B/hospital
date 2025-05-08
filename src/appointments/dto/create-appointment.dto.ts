import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateAppointmentDto {
    @ApiProperty({ example: 5, description: 'ID of the patient' })
    @IsNumber()
    patient_id: number;
  
    @ApiProperty({ example: 3, description: 'ID of the doctor' })
    @IsNumber()
    doctor_id: number;
  
    @ApiProperty({ example: 2, description: 'Department ID' })
    @IsNumber()
    department_id: number;
  
    @ApiProperty({ example: '2025-05-15', description: 'Appointment date' })
    @IsDateString()
    appointment_date: Date;
  
    @ApiProperty({ example: '14:30:00', description: 'Time slot for the appointment' })
    @IsString()
    time_slot: string;
  
    @ApiProperty({ example: 'Scheduled', description: 'Status of the appointment' })
    @IsString()
    status: string;
  }