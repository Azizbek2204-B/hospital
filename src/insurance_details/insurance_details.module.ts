import { Module } from '@nestjs/common';
import { InsuranceDetailsService } from './insurance_details.service';
import { InsuranceDetailsController } from './insurance_details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { InsuranceDetail } from './models/insurance_detail.model';

@Module({
  imports:[SequelizeModule.forFeature([InsuranceDetail])],
  controllers: [InsuranceDetailsController],
  providers: [InsuranceDetailsService],
})
export class InsuranceDetailsModule {}
