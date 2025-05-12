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
import { AuthModule } from "./auth/auth.module";
import { LabTest } from "./lab-tests/models/lab-test.model";
import { MedicalRecord } from "./medical-records/models/medical-record.model";
import { Appointment } from "./appointments/models/appointment.model";
import { Admission } from "./admissions/models/admission.model";
import { Patient } from "./patients/models/patient.model";
import { Prescription } from "./prescriptions/models/prescription.model";
import { Room } from "./rooms/models/room.model";
import { Invoice } from "./incoices/models/invoice.model";
import { Notification } from "./notifications/models/notification.model";
import { InsuranceDetail } from "./insurance_details/models/insurance_detail.model";
import { Medication } from "./mediations/models/medication.model";
import { FileModule } from './file/file.module';

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
      models: [
        Department,
        Doctor,
        Staff,
        LabTest,
        MedicalRecord,
        Appointment,
        Admission,
        Patient,
        Prescription,
        Room,
        Invoice,
        Notification,
        InsuranceDetail,
        Medication
      ],
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
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
