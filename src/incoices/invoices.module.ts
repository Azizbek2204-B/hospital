import { Module } from "@nestjs/common";
import { InvoicesService } from "./invoices.service";
import { InvoicesController } from "./invoices.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Invoice } from "./models/invoice.model";

@Module({
  imports: [SequelizeModule.forFeature([Invoice])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
