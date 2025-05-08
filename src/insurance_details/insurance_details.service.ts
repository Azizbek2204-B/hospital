import { Injectable } from '@nestjs/common';
import { CreateInsuranceDetailDto } from './dto/create-insurance_detail.dto';
import { UpdateInsuranceDetailDto } from './dto/update-insurance_detail.dto';
import { InjectModel } from '@nestjs/sequelize';
import { InsuranceDetail } from './models/insurance_detail.model';

@Injectable()
export class InsuranceDetailsService {
  constructor(@InjectModel(InsuranceDetail) private readonly insuranceDetailModel: typeof InsuranceDetail){}
  create(createInsuranceDetailDto: CreateInsuranceDetailDto) {
    return this.insuranceDetailModel.create(createInsuranceDetailDto)
  }

  findAll() {
    return this.insuranceDetailModel.findAll()
  }

  findOne(id: number) {
    return this.insuranceDetailModel.findByPk(id)
  }

  update(id: number, updateInsuranceDetailDto: UpdateInsuranceDetailDto) {
    return this.insuranceDetailModel.update(updateInsuranceDetailDto,{where:{id}})
  }

  remove(id: number) {
    return this.insuranceDetailModel.destroy({where:{id}})
  }
}
