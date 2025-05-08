import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { StaffModule } from "./staff/staff.module";
import { RoomsModule } from "./rooms/rooms.module";
import { PrescriptionsModule } from "./prescriptions/prescriptions.module";
import { PatientsModule } from "./patients/patients.module";
import { MedicalRecordsModule } from "./medical-records/medical-records.module";
import { MediationsModule } from "./mediations/medications.module";
import { LabTestsModule } from "./lab-tests/lab-tests.module";
import { InvoicesModule } from "./incoices/invoices.module";
import { DepartmentsModule } from "./departments/departments.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { AdmissionsModule } from "./admissions/admissions.module";
import { DoctorsModule } from "./doctors/doctors.module";
import { Department } from "./departments/models/department.model";
import { NotificationsModule } from "./notifications/notifications.module";
import { InsuranceDetailsModule } from "./insurance_details/insurance_details.module";
import { Doctor } from "./doctors/models/doctor.model";
import { Staff } from "./staff/models/staff.model";
import { MailModule } from "./mail/mail.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [Department, Doctor, Staff],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    StaffModule,
    RoomsModule,
    PrescriptionsModule,
    PatientsModule,
    MedicalRecordsModule,
    MediationsModule,
    LabTestsModule,
    InvoicesModule,
    DepartmentsModule,
    AppointmentsModule,
    AdmissionsModule,
    DoctorsModule,
    NotificationsModule,
    InsuranceDetailsModule,
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
