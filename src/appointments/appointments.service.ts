import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment) private readonly appoinmentModel:typeof Appointment) {
    
  }
  create(createAppointmentDto: CreateAppointmentDto) {
    return this.appoinmentModel.create(createAppointmentDto)
  }

  findAll() {
    return this.appoinmentModel.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.appoinmentModel.findByPk(id)
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appoinmentModel.update(updateAppointmentDto, {where:{id}})
  }

  remove(id: number) {
    return this.appoinmentModel.destroy({where:{id}})
  }
}
