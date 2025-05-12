import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Department } from './models/department.model';
import { DoctorsService } from '../doctors/doctors.service';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports: [SequelizeModule.forFeature([Department]), DoctorsModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports:[DepartmentsService]
})
export class DepartmentsModule {}
