import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Doctor } from "../doctors/models/doctor.model";
import { Patient } from "../patients/models/patient.model";
import { Staff } from "../staff/models/staff.model";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailDoctor(doctor: Doctor) {
    const url = `${process.env.API_HOST}/api/auth/doctor/activate/${doctor.activation_link}`;

    console.log(url);
    await this.mailerService.sendMail({
      to: doctor.email,
      subject: "Welcome to Hospital !",
      template: "./confirmation",
      context: {
        name: doctor.first_name,
        url,
      },
    });
  }

  async sendMailPatient(patient: Patient) {
    const url = `${process.env.API_HOST}/api/auth/patient/activate/${patient.activation_link}`;

    console.log(url);
    await this.mailerService.sendMail({
      to: patient.email,
      subject: "Welcome to Skidkachi App!",
      template: "./confirmation",
      context: {
        name: patient.first_name,
        url,
      },
    });
  }

  async sendMailStaff(staff: Staff) {
    const url = `${process.env.API_HOST}/api/auth/staff/activate/${staff.activation_link}`;

    console.log(url);
    await this.mailerService.sendMail({
      to: staff.email,
      subject: "Welcome to Skidkachi App!",
      template: "./confirmation",
      context: {
        name: staff.first_name,
        url,
      },
    });
  }

}
