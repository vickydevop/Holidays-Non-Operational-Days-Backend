import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import dbConfig from './config/db.config';
import { ManageHolidaysAndNonOperationalDasAppModule } from './modules/cloud-storage-app/manage-holidays-and-non-operational-days-app.module';
import { HelperService } from './common/services/helper/helper.service';
// import { CloudStorageAppModule } from './modules/cloud-storage-app/cloud-storage-app.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ManageHolidaysAndNonOperationalDasAppModule,
  ],
  controllers: [
    // AddEditHolidaysController,
  ],
  providers: [
    // HelperService
    // AddEditHolidaysService,
  ],
})
export class AppModule { }
// Established connection to database

export const dbConnection = new DataSource(dbConfig());
dbConnection
  .initialize()
  .then(() => {
    console.log(
      `Data Source has been initialized!`,
    );
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
