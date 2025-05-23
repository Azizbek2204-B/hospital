import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { StaffService } from "../staff/staff.service";
import { EmailService } from "../mail/mail.service";
import { CreateStaffDto } from "../staff/dto/create-staff.dto";
import * as bcrypt from "bcrypt";
import { SignInDto } from "./dto/sign-in.dto";
import { Request, Response } from "express";
import { CreatePatientDto } from "../patients/dto/create-patient.dto";
import { PatientsService } from "../patients/patients.service";
import { DoctorsService } from "../doctors/doctors.service";
import { CreateDoctorDto } from "../doctors/dto/create-doctor.dto";
import { FileService } from "../file/file.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly staffService: StaffService,
    private readonly mailService: EmailService,
    private readonly patientService: PatientsService,
    private readonly doctorService: DoctorsService,
    private readonly fileService: FileService
  ) {}

  async generateTokenStaff(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      hashed_password: user.hashed_password,
      is_active: user.is_active,
      roles: [user.role],
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.STAFF_ACCESS_TOKEN_KEY,
        expiresIn: process.env.STAFF_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.STAFF_REFRESH_TOKEN_KEY,
        expiresIn: process.env.STAFF_REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async signUpStaff(createPatientDto: CreateStaffDto, photo:any) {
    const doctor = await this.staffService.findByEmail(createPatientDto.email);
    if (doctor) {
      throw new BadRequestException("Bunday emailli foydalanuvchi mavjud");
    }
    
    const newStaff = await this.staffService.create(createPatientDto, photo);
    try {
      await this.mailService.sendMailStaff(newStaff);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(
        "Emailga xat yuborishda xatolik Pochtani tekshiring"
      );
    }
    return newStaff;
  }

  async signInStaff(signInDto: SignInDto, res: Response) {
    const staff = await this.staffService.findByEmail(signInDto.email);
    if (!staff) {
      throw new UnauthorizedException("Email yoki password noto'g'ri1");
    }
    const validPassword = await bcrypt.compare(
      signInDto.hashed_password,
      staff.hashed_password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email yoki password noto'g'ri2");
    }
    const { accessToken, refreshToken } = await this.generateTokenStaff(staff);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    staff.refresh_token = await bcrypt.hash(refreshToken, 7);

    await staff.save();

    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }

  async signOutStaff(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }

    let staffId: number;
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.STAFF_REFRESH_TOKEN_KEY,
      });
      staffId = payload.id;
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const staff = await this.staffService.findOne(staffId);
    if (!staff) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }
    staff.refresh_token = "";
    await staff.save();
    res.clearCookie("refresh_token");
    return { message: "Logout successfully" };
  }

  async refreshTokenStaff(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.STAFF_REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const staff = await this.staffService.findOne(payload.id);

    if (!staff || !staff.refresh_token) {
      throw new UnauthorizedException(
        "Foydalanuvchi topilmadi yoki token yo‘q"
      );
    }

    const isMatch = await bcrypt.compare(refresh_token, staff.refresh_token);
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const tokens = await this.generateTokenStaff(staff);
    staff.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await staff.save();

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Token yangilandi",
      accessToken: tokens.accessToken,
    };
  }

  async activateStaff(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updateStaff = await this.staffService.findByLink(link);
    if (!updateStaff) {
      throw new BadRequestException("Activation link not found database");
    }

    updateStaff.is_active = true;
    await updateStaff.save();

    return {
      message: "Staff activates successfully",
      is_active: updateStaff.is_active,
    };
  }

  async generateTokenPatient(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      hashed_password: user.hashed_password,
      is_active: user.is_active,
      roles: ["patient"],
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.PATIENT_ACCESS_TOKEN_KEY,
        expiresIn: process.env.PATIENT_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.PATIENT_REFRESH_TOKEN_KEY,
        expiresIn: process.env.PATIENT_REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async signUpPatient(createPatientDto: CreatePatientDto, photo:any) {
    const doctor = await this.patientService.findByEmail(
      createPatientDto.email
    );
    if (doctor) {
      throw new BadRequestException("Bunday emailli foydalanuvchi mavjud");
    }
    const newPatient = await this.patientService.create(createPatientDto, photo);
    try {
      await this.mailService.sendMailPatient(newPatient);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(
        "Emailga xat yuborishda xatolik Pochtani tekshiring"
      );
    }
    return newPatient;
  }

  async signInPatient(signInDto: SignInDto, res: Response) {
    const doctor = await this.patientService.findByEmail(signInDto.email);
    if (!doctor) {
      throw new UnauthorizedException("Email yoki password noto'g'ri1");
    }
    const validPassword = await bcrypt.compare(
      signInDto.hashed_password,
      doctor.hashed_password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email yoki password noto'g'ri2");
    }

    const { accessToken, refreshToken } =
      await this.generateTokenPatient(doctor);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    doctor.refresh_token = await bcrypt.hash(refreshToken, 7);

    await doctor.save();

    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }

  async signOutPatient(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }

    let patientId: number;
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.PATIENT_REFRESH_TOKEN_KEY,
      });
      patientId = payload.id;
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const patient = await this.patientService.findOne(patientId);
    if (!patient) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }
    patient.refresh_token = "";
    await patient.save();
    res.clearCookie("refresh_token");
    return { message: "Logout successfully" };
  }

  async refreshTokenPatient(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.PATIENT_REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const patient = await this.patientService.findOne(payload.id);

    if (!patient || !patient.refresh_token) {
      throw new UnauthorizedException(
        "Foydalanuvchi topilmadi yoki token yo‘q"
      );
    }

    const isMatch = await bcrypt.compare(refresh_token, patient.refresh_token);
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const tokens = await this.generateTokenPatient(patient);
    patient.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await patient.save();

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Token yangilandi",
      accessToken: tokens.accessToken,
    };
  }

  async activatePatient(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updatePatient = await this.patientService.findByLink(link);
    if (!updatePatient) {
      throw new BadRequestException("Activation link not found database");
    }

    updatePatient.is_active = true;
    await updatePatient.save();

    return {
      message: "Patient activates successfully",
      is_active: updatePatient.is_active,
    };
  }

  async generateTokenDoctor(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      hashed_password: user.hashed_password,
      is_active: user.is_active,
      roles: ["doctor"],
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.DOCTOR_ACCESS_TOKEN_KEY,
        expiresIn: process.env.DOCTOR_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.DOCTOR_REFRESH_TOKEN_KEY,
        expiresIn: process.env.DOCTOR_REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async signUpDoctor(createDoctorDto: CreateDoctorDto, photo:any) {
    const doctor = await this.doctorService.findByEmail(createDoctorDto.email);
    if (doctor) {
      throw new BadRequestException("Bunday emailli foydalanuvchi mavjud");
    }
    const hashed_password = await bcrypt.hash(
      createDoctorDto.hashed_password,
      7
    );
    createDoctorDto.hashed_password = hashed_password;
    const newDoctor = await this.doctorService.create(createDoctorDto, photo);
    try {
      await this.mailService.sendMailDoctor(newDoctor);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(
        "Emailga xat yuborishda xatolik Pochtani tekshiring"
      );
    }
    return newDoctor;
  }

  async signInDoctor(signInDto: SignInDto, res: Response) {
    const doctor = await this.doctorService.findByEmail(signInDto.email);
    if (!doctor) {
      throw new UnauthorizedException("Email yoki password noto'g'ri1");
    }
    const validPassword = await bcrypt.compare(
      signInDto.hashed_password,
      doctor.hashed_password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email yoki password noto'g'ri2");
    }

    const { accessToken, refreshToken } =
      await this.generateTokenDoctor(doctor);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    doctor.refresh_token = await bcrypt.hash(refreshToken, 7);

    await doctor.save();

    return {
      message: "Tizimga xush kelibsiz",
      accessToken,
    };
  }

  async signOutDoctor(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }

    let doctorId: number;
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.DOCTOR_REFRESH_TOKEN_KEY,
      });
      doctorId = payload.id;
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const doctor = await this.doctorService.findOne(doctorId);
    if (!doctor) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }
    doctor.refresh_token = "";
    await doctor.save();
    res.clearCookie("refresh_token");
    return { message: "Logout successfully" };
  }

  async refreshTokenDoctor(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh token topilmadi");
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.DOCTOR_REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto‘g‘ri yoki muddati tugagan");
    }

    const doctor = await this.doctorService.findOne(payload.id);

    if (!doctor || !doctor.refresh_token) {
      throw new UnauthorizedException(
        "Foydalanuvchi topilmadi yoki token yo‘q"
      );
    }

    const isMatch = await bcrypt.compare(refresh_token, doctor.refresh_token);
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const tokens = await this.generateTokenDoctor(doctor);
    doctor.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await doctor.save();

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Token yangilandi",
      accessToken: tokens.accessToken,
    };
  }

  async activateDoctor(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updateDoctor = await this.doctorService.findByLink(link);
    if (!updateDoctor) {
      throw new BadRequestException("Activation link not found database");
    }

    updateDoctor.is_active = true;
    await updateDoctor.save();

    return {
      message: "Doctor activates successfully",
      is_active: updateDoctor.is_active,
    };
  }
}
