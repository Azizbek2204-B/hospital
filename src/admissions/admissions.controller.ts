import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdmissionsService } from './admissions.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';

@Controller('admissions')
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Post()
  create(@Body() createAdmissionDto: CreateAdmissionDto) {
    return this.admissionsService.create(createAdmissionDto);
  }

  @Get()
  findAll() {
    return this.admissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.admissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdmissionDto: UpdateAdmissionDto) {
    return this.admissionsService.update(+id, updateAdmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.admissionsService.remove(+id);
  }
}
