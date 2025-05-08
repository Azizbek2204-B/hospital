import { Module } from "@nestjs/common";
import { MediationsService } from "./medications.service";
import { MediationsController } from "./medications.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Medication } from "./models/medication.model";

@Module({
  imports: [SequelizeModule.forFeature([Medication])],
  controllers: [MediationsController],
  providers: [MediationsService],
})
export class MediationsModule {}
