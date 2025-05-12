import { Injectable } from "@nestjs/common";
import { UpdateMediationDto } from "./dto/update-medication.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Medication } from "./models/medication.model";
import { CreateMedicationDto } from "./dto/create-medication.dto";

@Injectable()
export class MediationsService {
  constructor(@InjectModel(Medication) private readonly medicationModel:typeof Medication){}
  create(createMediationDto: CreateMedicationDto) {
    return this.medicationModel.create(createMediationDto)
  }

  findAll() {
    return this.medicationModel.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.medicationModel.findByPk(id)
  }

  update(id: number, updateMediationDto: UpdateMediationDto) {
    return this.medicationModel.update(updateMediationDto, {where:{id}})
  }

  remove(id: number) {
    return this.medicationModel.destroy({where:{id}})
  }
}
