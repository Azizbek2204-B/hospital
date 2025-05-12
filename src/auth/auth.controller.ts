import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { Request, Response } from "express";
import { CreateStaffDto } from "../staff/dto/create-staff.dto";
import { CreateDoctorDto } from "../doctors/dto/create-doctor.dto";
import { CreatePatientDto } from "../patients/dto/create-patient.dto";
import { JwtAuthGuard } from "../common/guard/jwt-auth.guard";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guard/roles.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles("superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post("sign-up-staff")
  @UseInterceptors(FileInterceptor("photo"))
  async signUpStaff(
    @Body() createStaffDto: CreateStaffDto,
    @UploadedFile() photo: any
  ) {
    return this.authService.signUpStaff(createStaffDto, photo);
  }

  @Post("sign-in-staff")
  async signInStaff(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInStaff(signInDto, res);
  }

  @Post("sign-out-staff")
  async signOutStaff(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutStaff(req, res);
  }

  @Get("refresh-token-staff")
  async refreshTokenStaff(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenStaff(req, res);
  }

  @Get("staff/activate/:link")
  async activateStaff(@Param("link") link: string) {
    return this.authService.activateStaff(link);
  }

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post("sign-up-doctor")
  @UseInterceptors(FileInterceptor("photo"))
  async signUpDoctor(
    @Body() createDoctorDto: CreateDoctorDto,
    @UploadedFile() photo: any
  ) {
    return this.authService.signUpDoctor(createDoctorDto, photo);
  }

  @Post("sign-in-doctor")
  async signInDoctor(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInDoctor(signInDto, res);
  }

  @Post("sign-out-doctor")
  async signOutDoctor(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutDoctor(req, res);
  }

  @Get("refresh-token-doctor")
  async refreshTokenDoctor(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenDoctor(req, res);
  }

  @Get("doctor/activate/:link")
  async activateDoctor(@Param("link") link: string) {
    return this.authService.activateDoctor(link);
  }

  @Post("sign-up-patient")
  @UseInterceptors(FileInterceptor("photo"))
  async signUpPatient(
    @Body() createPatientDto: CreatePatientDto,
    @UploadedFile() photo: any
  ) {
    return this.authService.signUpPatient(createPatientDto, photo);
  }

  @Post("sign-in-patient")
  async signInPatient(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInPatient(signInDto, res);
  }

  @Post("sign-out-patient")
  async signOutPatient(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutPatient(req, res);
  }

  @Get("refresh-token-patient")
  async refreshTokenPatient(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenPatient(req, res);
  }

  @Get("patient/activate/:link")
  async activatePatient(@Param("link") link: string) {
    return this.authService.activatePatient(link);
  }
}
