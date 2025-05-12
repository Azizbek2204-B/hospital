import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { DoctorsService } from "./doctors.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guard/roles.guard";
import { JwtActiveGuard } from "../common/guard/jwt-active.guard";
import { JwtAuthGuard } from "../common/guard/jwt-auth.guard";
import { JwtSelfGuard } from "../common/guard/jwt-self.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor("photo"))
  create(@Body() createDoctorDto: CreateDoctorDto, @UploadedFile() photo: any) {
    return this.doctorsService.create(createDoctorDto, photo);
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.doctorsService.findOne(+id);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":email")
  findByEmail(@Param("email") email: string) {
    return this.doctorsService.findByEmail(email);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.doctorsService.remove(+id);
  }

  @Get(":id/appointments-with-patients")
  async findDoctorAppointmentsWithPatients(@Param("id") doctorId: number) {
    return this.doctorsService.findDoctorAppointmentsWithPatients(doctorId);
  }

  @Get(":id/medical-records-with-lab-tests")
  async findDoctorMedicalRecordsWithLabTests(@Param("id") doctorId: number) {
    return this.doctorsService.findDoctorMedicalRecordsWithLabTests(doctorId);
  }

  @Get(":id/patients-with-prescriptions")
  async findDoctorPatientsWithPrescriptions(@Param("id") doctorId: number) {
    return this.doctorsService.findDoctorPatientsWithPrescriptions(doctorId);
  }
}
