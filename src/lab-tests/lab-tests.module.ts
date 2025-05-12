import { Module } from '@nestjs/common';
import { LabTestsService } from './lab-tests.service';
import { LabTestsController } from './lab-tests.controller';
import { LabTest } from './models/lab-test.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[SequelizeModule.forFeature([LabTest])],
  controllers: [LabTestsController],
  providers: [LabTestsService],
  exports:[LabTestsService]
})
export class LabTestsModule {}
