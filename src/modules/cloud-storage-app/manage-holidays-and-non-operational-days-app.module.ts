import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { QueryProceduresModule } from './query-procedures/query-procedures.module';
import { AddEditHolidaysController } from './controllers/Add-Edit-Holidays/addeditholidays.controller';
import { AddEditHolidaysService } from './services/Add-Edit-Holidays/addeditholidays.service';
import { AddEditNonOperationaldaysController } from './controllers/Add-Edit-Non-Operational_days/addeditnonoperationaldays.controller';
import { AddEditNonOperationaldaysService } from './services/Add-Edit-Non-Operational_days/addeditnonoperationaldays.service';
import { HelperService } from 'src/common/services/helper/helper.service';

@Module({
  imports: [QueryProceduresModule, AuthModule],
  controllers: [AddEditHolidaysController, AddEditNonOperationaldaysController,
  ],
  providers: [AddEditHolidaysService, AddEditNonOperationaldaysService,HelperService
  ],
})
export class ManageHolidaysAndNonOperationalDasAppModule {}
