import { Injectable } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Notification } from "./models/notification.model";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification)
    private readonly notificationModel: typeof Notification
  ) {}
  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationModel.create(createNotificationDto);
  }

  findAll() {
    return this.notificationModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.notificationModel.findByPk();
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.notificationModel.update(updateNotificationDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.notificationModel.destroy({ where: { id } });
  }
}
