import { Injectable } from "@nestjs/common";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Department } from "./models/department.model";

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department) private readonly departmentModel: typeof Department
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentModel.create(createDepartmentDto);
  }

  findAll() {
    return this.departmentModel.findAll();
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
}
