import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AdmissionsService } from "./admissions.service";
import { CreateAdmissionDto } from "./dto/create-admission.dto";
import { UpdateAdmissionDto } from "./dto/update-admission.dto";
import { JwtAuthGuard } from "../common/guard/jwt-auth.guard";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guard/roles.guard";

@Controller("admissions")
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Roles("doctor", "admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdmissionDto: CreateAdmissionDto) {
    return this.admissionsService.create(createAdmissionDto);
  }

  @Roles("doctor", "admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.admissionsService.findAll();
  }

  @Roles("doctor", "admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.admissionsService.findOne(+id);
  }

  @Roles("doctor", "admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAdmissionDto: UpdateAdmissionDto
  ) {
    return this.admissionsService.update(+id, updateAdmissionDto);
  }

  @Roles("doctor", "admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.admissionsService.remove(+id);
  }
}
