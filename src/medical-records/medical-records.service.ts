import { Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical-record.model';

@Injectable()
export class MedicalRecordsService {
  constructor(@InjectModel(MedicalRecord) private readonly medicalRecordModel:typeof MedicalRecord){}
  create(createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordModel,this.create(createMedicalRecordDto)
  }

  findAll() {
    return this.medicalRecordModel.findAll()
  }

  findOne(id: number) {
    return this.medicalRecordModel.findByPk(id)
  }

  update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return this.medicalRecordModel.update(updateMedicalRecordDto, {where:{id}})
  }

  remove(id: number) {
    return this.medicalRecordModel.destroy({where:{id}})
  }
}
