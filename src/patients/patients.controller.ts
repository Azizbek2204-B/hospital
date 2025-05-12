import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guard/roles.guard";
import { JwtActiveGuard } from "../common/guard/jwt-active.guard";
import { JwtAuthGuard } from "../common/guard/jwt-auth.guard";
import { JwtSelfGuard } from "../common/guard/jwt-self.guard";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("photo"))
  create(@Body() createPatientDto: CreatePatientDto, @UploadedFile() photo:any) {
    return this.patientsService.create(createPatientDto, photo);
  }

  @Roles("superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":email")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }

  @Patch("update-password/:id")
  updatePassword(@Param("id") id: string,@Body() updatePasswordDto:UpdatePasswordDto){
    const userId = Number(id)
    return this.patientsService.updatePassword(userId, updatePasswordDto);
  }

  @Get(':id/medical-records-with-lab-tests')
  async findPatientMedicalRecordsWithLabTests(@Param('id') patientId: number) {
    return this.patientsService.findPatientMedicalRecordsWithLabTests(patientId);
  }

  @Get(':id/prescriptions-with-medications')
  async findPatientPrescriptionsWithMedications(@Param('id') patientId: number) {
    return this.patientsService.findPatientPrescriptionsWithMedications(patientId);
  }

  @Get(':id/lab-tests-with-technicians')
  async findPatientLabTestsWithTechnicians(@Param('id') patientId: number) {
    return this.patientsService.findPatientLabTestsWithTechnicians(patientId);
  }

  @Get(':id/full-details')
  async findPatientFullDetails(@Param('id') patientId: number) {
    return this.patientsService.findPatientFullDetails(patientId);
  }
}
