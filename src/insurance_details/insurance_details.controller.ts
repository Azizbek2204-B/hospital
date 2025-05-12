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
import { InsuranceDetailsService } from "./insurance_details.service";
import { CreateInsuranceDetailDto } from "./dto/create-insurance_detail.dto";
import { UpdateInsuranceDetailDto } from "./dto/update-insurance_detail.dto";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guard/roles.guard";
import { JwtSelfGuard } from "../common/guard/jwt-self.guard";
import { JwtAuthGuard } from "../common/guard/jwt-auth.guard";

@Controller("insurance-details")
export class InsuranceDetailsController {
  constructor(
    private readonly insuranceDetailsService: InsuranceDetailsService
  ) {}

  @Roles("patient")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createInsuranceDetailDto: CreateInsuranceDetailDto) {
    return this.insuranceDetailsService.create(createInsuranceDetailDto);
  }

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.insuranceDetailsService.findAll();
  }

  @Roles("patient")
  @UseGuards(RolesGuard)
  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.insuranceDetailsService.findOne(+id);
  }

  @Roles("patient")
  @UseGuards(RolesGuard)
  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateInsuranceDetailDto: UpdateInsuranceDetailDto
  ) {
    return this.insuranceDetailsService.update(+id, updateInsuranceDetailDto);
  }

  @Roles("patient")
  @UseGuards(RolesGuard)
  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.insuranceDetailsService.remove(+id);
  }
}
