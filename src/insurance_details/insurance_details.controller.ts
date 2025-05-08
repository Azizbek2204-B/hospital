import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InsuranceDetailsService } from './insurance_details.service';
import { CreateInsuranceDetailDto } from './dto/create-insurance_detail.dto';
import { UpdateInsuranceDetailDto } from './dto/update-insurance_detail.dto';

@Controller('insurance-details')
export class InsuranceDetailsController {
  constructor(private readonly insuranceDetailsService: InsuranceDetailsService) {}

  @Post()
  create(@Body() createInsuranceDetailDto: CreateInsuranceDetailDto) {
    return this.insuranceDetailsService.create(createInsuranceDetailDto);
  }

  @Get()
  findAll() {
    return this.insuranceDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insuranceDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsuranceDetailDto: UpdateInsuranceDetailDto) {
    return this.insuranceDetailsService.update(+id, updateInsuranceDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insuranceDetailsService.remove(+id);
  }
}
