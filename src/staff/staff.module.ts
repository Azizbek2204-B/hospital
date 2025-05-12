import { Module } from "@nestjs/common";
import { StaffController } from "./staff.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";
import { StaffService } from "./staff.service";
import { LabTest } from "../lab-tests/models/lab-test.model";
import { FileModule } from "../file/file.module";

@Module({
  imports: [SequelizeModule.forFeature([Staff, LabTest]), FileModule],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
