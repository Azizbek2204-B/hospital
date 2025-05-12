import { Injectable } from "@nestjs/common";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Department } from "./models/department.model";
import { DoctorsService } from "../doctors/doctors.service";

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department)
    private readonly departmentModel: typeof Department,
    private readonly doctorService: DoctorsService
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentModel.create(createDepartmentDto);
  }

  findAll() {
    return this.departmentModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.departmentModel.findByPk(id);
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentModel.update(updateDepartmentDto, { where: { id } });
  }

  remove(id: number) {
    return this.departmentModel.destroy({ where: { id } });
  }

  async findAllDoctorCity(name: string) {
    const city = await this.departmentModel.findOne({ where: { name } });
    if (city && city.id) {
      return this.doctorService.findDoctorsByCity(city.id);
    }
  }
}
