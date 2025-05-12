import { Injectable } from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { MedicalRecord } from "../medical-records/models/medical-record.model";
import { Medication } from "../mediations/models/medication.model";
import { Prescription } from "../prescriptions/models/prescription.model";
import { LabTest } from "../lab-tests/models/lab-test.model";
import { Patient } from "../patients/models/patient.model";
import { Appointment } from "../appointments/models/appointment.model";
import { FileService } from "../file/file.service";

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private readonly doctorModel: typeof Doctor,
    private readonly fileService: FileService
  ) {}
  async create(createDoctorDto: CreateDoctorDto, photo:any) {
    const fileName = await this.fileService.saveFile(photo)
    return this.doctorModel.create({...createDoctorDto, photo:fileName});
  }

  findAll() {
    return this.doctorModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.doctorModel.findByPk(id);
  }

  findByEmail(email: string) {
    return this.doctorModel.findOne({ where: { email } });
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorModel.update(updateDoctorDto, { where: { id } });
  }

  remove(id: number) {
    return this.doctorModel.destroy({ where: { id } });
  }

  findByLink(activation_link: string) {
    return this.doctorModel.findOne({ where: { activation_link } });
  }

  async findDoctorsByCity(department_id: number) {
    return this.doctorModel.findAll({
      where: { department_id },
    });
  }

  async findDoctorAppointmentsWithPatients(doctorId: number) {
    return this.doctorModel.findOne({
      where: { id: doctorId },
      include: [
        {
          model: Appointment,
          include: [Patient],
        },
      ],
    });
  }

  async findDoctorMedicalRecordsWithLabTests(doctorId: number) {
    return this.doctorModel.findOne({
      where: { id: doctorId },
      include: [
        {
          model: MedicalRecord,
          include: [LabTest],
        },
      ],
    });
  }

  async findDoctorPatientsWithPrescriptions(doctorId: number) {
    return this.doctorModel.findOne({
      where: { id: doctorId },
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
}
