import { PartialType } from "@nestjs/mapped-types";
import { CreateMedicationDto } from "./create-medication.dto";

export class UpdateMediationDto extends PartialType(CreateMedicationDto) {
    id:number
    name: string;
    unit_price: number;
    expiry_date: Date;
}
