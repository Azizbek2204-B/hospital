import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { JwtAuthGuard } from '../common/guard/jwt-auth.guard';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { JwtActiveGuard } from '../common/guard/jwt-active.guard';
import { JwtSelfGuard } from '../common/guard/jwt-self.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // @Roles("superadmin")
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtActiveGuard)
  // @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor("photo"))
  create(@Body() createStaffDto: CreateStaffDto,@UploadedFile() photo:any) {
    return this.staffService.create(createStaffDto, photo);
  }

  @Roles("admin", "superadmin", )
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Roles("admin", "superadmin", )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @UseGuards(JwtSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Roles("admin", "superadmin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtActiveGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }

  @Get('department/:departmentId')
  async findStaffByDepartment(@Param('departmentId') departmentId: number) {
    return this.staffService.findStaffByDepartment(departmentId);
  }
}
