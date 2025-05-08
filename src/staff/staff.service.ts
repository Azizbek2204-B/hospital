import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';

@Injectable()
export class StaffService {
  constructor(@InjectModel(Staff) private readonly staffModel:typeof Staff){}
  create(createStaffDto: CreateStaffDto) {
    return this.staffModel.create(createStaffDto);
  }

  findAll() {
    return this.staffModel.findAll();
  }

  findOne(id: number) {
    return this.staffModel.findOne({where:{id}});
  }

  findByEmail(email: string) {
    return this.staffModel.findOne({where:{email}});
  }

  findByLink(activation_link: string) {
    return this.staffModel.findOne({where:{activation_link}});
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.staffModel.update(updateStaffDto, {where:{id}});
  }

  remove(id: number) {
    return this.staffModel.destroy({where:{id}});
  }
}
