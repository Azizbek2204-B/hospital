import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MediationsService } from "./medications.service";
import { UpdateMediationDto } from "./dto/update-medication.dto";
import { CreateMedicationDto } from "./dto/create-medication.dto";

@Controller("mediations")
export class MediationsController {
  constructor(private readonly mediationsService: MediationsService) {}

  @Post()
  create(@Body() createMediationDto: CreateMedicationDto) {
    return this.mediationsService.create(createMediationDto);
  }

  @Get()
  findAll() {
    return this.mediationsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.mediationsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMediationDto: UpdateMediationDto
  ) {
    return this.mediationsService.update(+id, updateMediationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.mediationsService.remove(+id);
  }
}
