import { Injectable } from '@nestjs/common';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admission } from './models/admission.model';

@Injectable()
export class AdmissionsService {
  constructor(@InjectModel(Admission) private readonly admissionsModel:typeof Admission){}
  create(createAdmissionDto: CreateAdmissionDto) {
    return this.admissionsModel.create(createAdmissionDto)
  }

  findAll() {
    return this.admissionsModel.findAll()
  }

  findOne(id: number) {
    return this.admissionsModel.findByPk(id)
  }

  update(id: number, updateAdmissionDto: UpdateAdmissionDto) {
    return this.admissionsModel.update(updateAdmissionDto, {where:{id}})
  }

  remove(id: number) {
    return this.admissionsModel.destroy({where:{id}})
  }
}
