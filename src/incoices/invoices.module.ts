import { Module } from "@nestjs/common";
import { InvoicesService } from "./invoices.service";
import { InvoicesController } from "./invoices.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Invoice } from "./models/invoice.model";
import { DepartmentsModule } from "../departments/departments.module";

@Module({
  imports: [SequelizeModule.forFeature([Invoice]), DepartmentsModule],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
