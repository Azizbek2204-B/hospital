import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
    @ApiProperty({ example: 1, description: "Room ID" })
    @IsNumber()
    id: number;

    @ApiProperty({ example: "101A", description: "Room number" })
    @IsString()
    room_number: string;

    @ApiProperty({ example: "Single", description: "Type of the room (e.g., Single, Double, Suite)" })
    @IsString()
    room_type: string;

    @ApiProperty({ example: true, description: "Availability status of the room" })
    @IsBoolean()
    is_available: boolean;

    @ApiProperty({ example: 150.00, description: "Rate per day in dollars" })
    @IsNumber()
    rate_per_day: number;
}
