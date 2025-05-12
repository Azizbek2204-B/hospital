import { BadRequestException, Injectable } from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import * as bcrypt from "bcrypt";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { Prescription } from "../prescriptions/models/prescription.model";
import { Medication } from "../mediations/models/medication.model";
import { LabTest } from "../lab-tests/models/lab-test.model";
import { MedicalRecord } from "../medical-records/models/medical-record.model";
import { Appointment } from "../appointments/models/appointment.model";
import { Doctor } from "../doctors/models/doctor.model";
import { Staff } from "../staff/models/staff.model";
import { FileService } from "../file/file.service";

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    private readonly fileService: FileService
  ) {}
  async create(createPatientDto: CreatePatientDto, photo:any) {
    const hashedPassword = await bcrypt.hash(
      createPatientDto.hashed_password,
      7
    );
    const fileName = await this.fileService.saveFile(photo)
    createPatientDto.hashed_password = hashedPassword;
    return this.patientModel.create({...createPatientDto, photo:fileName});
  }

  findAll() {
    return this.patientModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.patientModel.findByPk(id);
  }

  findByEmail(email: string) {
    return this.patientModel.findOne({ where: { email } });
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientModel.update(updatePatientDto, { where: { id } });
  }

  remove(id: number) {
    return this.patientModel.destroy({ where: { id } });
  }

  findByLink(activation_link: string) {
    return this.patientModel.findOne({ where: { activation_link } });
  }

  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.patientModel.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException("Foydalanuvchi topilmadi");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.hashed_password);
    if (!isMatch) {
      throw new BadRequestException("Eski parol noto'g'ri");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.hashed_password = hashedPassword;
    await user.save();

    return { message: "Parol muvaffaqiyatli yangilandi" };
  }

  async findPatientMedicalRecordsWithLabTests(patientId: number) {
    return this.patientModel.findOne({
      where: { id: patientId },
      include: [
        {
          model: MedicalRecord,
          include: [LabTest],
        },
      ],
    });
  }

  async findPatientPrescriptionsWithMedications(patientId: number) {
    return this.patientModel.findOne({
      where: { id: patientId },
      include: [
        {
          model: MedicalRecord,
          include: [
            {
              model: Prescription,
              include: [Medication],
            },
          ],
        },
      ],
    });
  }

  async findPatientLabTestsWithTechnicians(patientId: number) {
    return this.patientModel.findOne({
      where: { id: patientId },
      include: [
        {
          model: MedicalRecord,
          include: [
            {
              model: LabTest,
              include: [Staff],
            },
          ],
        },
      ],
    });
  }

  async findPatientFullDetails(patientId: number) {
    return this.patientModel.findOne({
      where: { id: patientId },
      include: [
        {
          model: Appointment,
          include: [Doctor],
        },
        {
          model: MedicalRecord,
          include: [
            LabTest,
            {
              model: Prescription,
              include: [Medication],
            },
          ],
        },
      ],
    });
  }
}
