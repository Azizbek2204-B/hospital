import { Module } from "@nestjs/common";
import { DoctorsService } from "./doctors.service";
import { DoctorsController } from "./doctors.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { FileModule } from "../file/file.module";

@Module({
  imports: [SequelizeModule.forFeature([Doctor]), FileModule],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports:[DoctorsService, DoctorsModule]
})
export class DoctorsModule {}
