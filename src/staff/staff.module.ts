import { Module } from "@nestjs/common";
import { StaffController } from "./staff.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";
import { StaffService } from "./staff.service";

@Module({
  imports: [SequelizeModule.forFeature([Staff])],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
