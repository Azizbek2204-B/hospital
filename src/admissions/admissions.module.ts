import { Module } from '@nestjs/common';
import { AdmissionsService } from './admissions.service';
import { AdmissionsController } from './admissions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admission } from './models/admission.model';

@Module({
  imports:[SequelizeModule.forFeature([Admission])],
  controllers: [AdmissionsController],
  providers: [AdmissionsService],
})
export class AdmissionsModule {}
