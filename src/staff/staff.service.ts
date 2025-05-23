import { Injectable } from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";
import { FileService } from "../file/file.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff) private readonly staffModel: typeof Staff,
    private readonly fileService: FileService
  ) {}
  async create(createStaffDto: CreateStaffDto, photo: any) {
    const fileName = await this.fileService.saveFile(photo);
    const hashed_password = await bcrypt.hash(
      createStaffDto.hashed_password,
      7
    );

    createStaffDto.hashed_password = hashed_password;
    console.log(photo);
    return this.staffModel.create({ ...createStaffDto, photo: fileName });
  }

  findAll() {
    return this.staffModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.staffModel.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.staffModel.findOne({ where: { email } });
  }

  findByLink(activation_link: string) {
    return this.staffModel.findOne({ where: { activation_link } });
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.staffModel.update(updateStaffDto, { where: { id } });
  }

  remove(id: number) {
    return this.staffModel.destroy({ where: { id } });
  }

  async findStaffByDepartment(departmentId: number) {
    return this.staffModel.findAll({
      where: { department_id: departmentId },
      include: [{ all: true }],
    });
  }
}
