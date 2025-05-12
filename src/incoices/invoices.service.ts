import { Injectable } from "@nestjs/common";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Invoice } from "./models/invoice.model";

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice) private readonly invoiceModel: typeof Invoice
  ) {}
  create(createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceModel.create(createInvoiceDto);
  }

  findAll() {
    return this.invoiceModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.invoiceModel.findByPk(id);
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceModel.update(updateInvoiceDto, { where: { id } });
  }

  remove(id: number) {
    return this.invoiceModel.destroy({ where: { id } });
  }
}
