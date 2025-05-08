import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './models/room.model';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private readonly roomModel:typeof Room){}
  create(createRoomDto: CreateRoomDto) {
    return this.roomModel.create(createRoomDto);
  }

  findAll() {
    return this.roomModel.findAll();
  }

  findOne(id: number) {
    return this.roomModel.findOne({where:{id}});
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomModel.update(updateRoomDto, {where:{id}});
  }

  remove(id: number) {
    return this.roomModel.destroy({where:{id}});
  }
}
