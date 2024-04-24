/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/app.module';
import * as mysql from 'mysql2';
import { query } from 'express';
import { log } from 'console';
import { HelperService } from 'src/common/services/helper/helper.service';
// import * as countryCityStateJson from 'countrycitystatejson';
const { DateTime } = require('luxon');

@Injectable()
export class AddEditNonOperationaldaysService {
  constructor(
    // private _dateTimeService: DateTimeService,
    private helper: HelperService,
  ) {}
  async getNonOperationalDays(country_code, customer_id, user_id) {
    try {
      const dbName = `${country_code}_${customer_id}_edu_customer_db`;
      //   const tableExistorNot = await dbConnection.query(`
      // SELECT count(*) as db FROM information_schema.tables
      // WHERE table_schema = '${dbName}'AND table_name = '39_userapp_common_non_operational_days'
      // LIMIT 1;
      // `);

      if (
        (await this.helper.tableExists(
          `${dbName}`,
          `39_userapp_common_non_operational_days`,
        )) == 1
      ) {
        const getdata = await dbConnection.query(`
                select *,  DATE_FORMAT(common_non_operational_day_date,'%Y-%m-%d') AS common_non_operational_day_date from ${dbName}.39_userapp_common_non_operational_days;
                `);

        return getdata;
      } else {
        return { getdata: [] };
      }
      // console.log(tableExistorNot[0].db);
      // if (tableExistorNot[0].db == 0) {
      //   return { getdata: [] };
      // } else {
      //   const getdata = await dbConnection.query(`
      //           select *,  DATE_FORMAT(common_non_operational_day_date,'%Y-%m-%d') AS common_non_operational_day_date from ${dbName}.39_userapp_common_non_operational_days;
      //           `);

      //   return getdata;
      // }
    } catch (error) {
      throw error;
    }
  }

  async postNonOperationalDays(
    country_code,
    customer_id,
    timezone,
    user_id,
    common_non_operational_day_date,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;
      //   const tableExistorNot = await dbConnection.query(`
      // SELECT count(*) as db FROM information_schema.tables
      // WHERE table_schema = '${dbName}'AND table_name = '39_userapp_common_non_operational_days'
      // LIMIT 1;
      // `);
      //   const audittableExistorNot = await dbConnection.query(`
      // SELECT count(*) as db FROM information_schema.tables
      // WHERE table_schema = '${dbName}'AND table_name = 'audit_trail_for_manage_holidays_non_operational_days'
      // LIMIT 1;
      // `);
      // console.log((await this.helper.tableExists(
      //   `${dbName}`,
      //   `39_userapp_common_non_operational_days`,
      // )),'yes')
      let postdata: any;
      if (
        (await this.helper.tableExists(
          `${dbName}`,
          `39_userapp_common_non_operational_days`,
        )) == 1
      ) {
        const check = await dbConnection.query(
          `select count(*) as count from ${dbName}.39_userapp_common_non_operational_days where common_non_operational_day_date=${mysql.escape(
            common_non_operational_day_date,
          )}`,
        );
        // console.log(check,'check');
        if (check[0].count == 0) {
          // console.log(check,'check');
          postdata = await dbConnection.query(`
            insert into ${dbName}.39_userapp_common_non_operational_days(	 
                common_non_operational_day_date,
                flag
                )
                values(
                ${mysql.escape(common_non_operational_day_date)},
                1
            );           
            `);
          if (
            (await this.helper.tableExists(
              `${dbName}`,
              `audit_trail_for_manage_holidays_non_operational_days`,
            )) == 1
          ) {
            await dbConnection.query(`
                    insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
                    (
                entry_by_user_id,
                entry_type, 
                app_id,
                entry_date_time
                    )
                    values
                    (
                      ${mysql.escape(user_id)},
                      'Insert',
                      'U39',
                      ${mysql.escape(requestdate)} 
                    )
                   `);
          } else {
            await dbConnection.query(`
                  create table ${dbName}.audit_trail_for_manage_holidays_non_operational_days(
                    id int not null auto_increment primary key,
                    entry_by_user_id int,
                    entry_type varchar(50),
                    app_id varchar(5),
                    entry_date_time datetime
                    )
                  `);
            await dbConnection.query(`
                    insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
                    (
                entry_by_user_id,
                entry_type, 
                app_id,
                entry_date_time
                    )
                    values
                    (
                      ${mysql.escape(user_id)},
                      'Insert',
                      'U39',
                      ${mysql.escape(requestdate)} 
                    )
                   `);
          }
        }
      } else {
        await dbConnection.query(`
        create table ${dbName}.39_userapp_common_non_operational_days(
            common_non_operational_day_id int primary key auto_increment,
            common_non_operational_day_date date,
            flag varchar(5)
            )         
        `);
        const check = await dbConnection.query(
          `select count(*) as count from ${dbName}.39_userapp_common_non_operational_days where common_non_operational_day_date=${mysql.escape(
            common_non_operational_day_date,
          )}`,
        );
        // console.log(check,'check');
        if (check[0].count == 0) {
          postdata = await dbConnection.query(`
              insert into ${dbName}.39_userapp_common_non_operational_days(	 
                  common_non_operational_day_date,
                  flag
                  )
                  values(
                  ${mysql.escape(common_non_operational_day_date)},
                  1
              );           
              `);
          if (
            (await this.helper.tableExists(
              `${dbName}`,
              `audit_trail_for_manage_holidays_non_operational_days`,
            )) == 1
          ) {
            await dbConnection.query(`
                      insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
                      (
                  entry_by_user_id,
                  entry_type, 
                  app_id,
                  entry_date_time
                      )
                      values
                      (
                        ${mysql.escape(user_id)},
                        'Insert',
                        'U39',
                        ${mysql.escape(requestdate)} 
                      )
                     `);
          } else {
            await dbConnection.query(`
                    create table ${dbName}.audit_trail_for_manage_holidays_non_operational_days(
                      id int not null auto_increment primary key,
                      entry_by_user_id int,
                      entry_type varchar(50),
                      app_id varchar(5),
                      entry_date_time datetime
                      )
                    `);
            await dbConnection.query(`
                      insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
                      (
                  entry_by_user_id,
                  entry_type, 
                  app_id,
                  entry_date_time
                      )
                      values
                      (
                        ${mysql.escape(user_id)},
                        'Insert',
                        'U39',
                        ${mysql.escape(requestdate)} 
                      )
                     `);
          }
        }
      }
      // console.log(tableExistorNot[0].db);
      // if (tableExistorNot[0].db == 0) {
      // const create = await dbConnection.query(`
      // create table ${dbName}.39_userapp_common_non_operational_days(
      //     common_non_operational_day_id int primary key auto_increment,
      //     common_non_operational_day_date date,
      //     flag varchar(5)
      //     )
      // `);
      // if (audittableExistorNot[0].db == 0) {
      //   const create_audit_table = await dbConnection.query(`
      // create table ${dbName}.audit_trail_for_manage_holidays_non_operational_days(
      //   entry_by_user_id int,
      //   entry_type varchar(50),
      //   app_id varchar(5),
      //   entry_date_time datetime
      //   )
      // `);
      // }
      // const postdata = await dbConnection.query(`
      //     insert into ${dbName}.39_userapp_common_non_operational_days(
      //         common_non_operational_day_date,
      //         flag
      //         )
      //         values(
      //         ${mysql.escape(common_non_operational_day_date)},
      //         1
      //     );
      //     `);

      // aduit trail
      //   const a = await dbConnection.query(`
      //     insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
      //     (
      // entry_by_user_id,
      // entry_type,
      // app_id,
      // entry_date_time
      //     )
      //     values
      //     (
      //       ${mysql.escape(user_id)},
      //       'Insert',
      //       'U39',
      //       ${mysql.escape(requestdate)}
      //     )
      //    `);
      //   return postdata;
      // } else {
      //   const checkdata = await dbConnection.query(`
      //       select count(*) as count from ${dbName}.39_userapp_common_non_operational_days
      //       where common_non_operational_day_date = ${mysql.escape(
      //         common_non_operational_day_date,
      //       )};

      //       `);
      //   console.log(checkdata[0].count);

      //   if (checkdata[0].count < 1) {
      //     console.log('ddd');

      //     const postdata = await dbConnection.query(`
      //       insert into ${dbName}.39_userapp_common_non_operational_days(
      //           common_non_operational_day_date,
      //           flag
      //           )
      //           values(
      //           ${mysql.escape(common_non_operational_day_date)},
      //           1
      //       );
      //       `);

      //     // aduit trail
      //     const a = await dbConnection.query(`
      //     insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
      //     (
      // entry_by_user_id,
      // entry_type,
      // app_id,
      // entry_date_time
      //     )
      //     values
      //     (
      //       ${mysql.escape(user_id)},
      //       'Insert',
      //       'U39',
      //       ${mysql.escape(requestdate)}
      //     )
      //    `);
      //     return postdata;
      //   } else {
      //     console.log('sss');
      //   }
      // }
      return postdata;
    } catch (error) {
      throw error;
    }
  }

  async deleteNonOperationalDays(
    country_code,
    customer_id,
    timezone,
    user_id,
    common_non_operational_day_date,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;

      const postdata = await dbConnection.query(`
            delete from ${dbName}.39_userapp_common_non_operational_days
            where common_non_operational_day_date = ${mysql.escape(
              common_non_operational_day_date,
            )};     
            `);

      // aduit trail
      if((await this.helper.tableExists(`${country_code}_${customer_id}_edu_customer_db`,`audit_trail_for_manage_holidays_non_operational_days`))==1){
        await dbConnection.query(`
                          insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
                          (
                      entry_by_user_id,
                      entry_type, 
                      app_id,
                      entry_date_time
                          )
                          values
                          (
                            ${mysql.escape(user_id)},
                            'Delete',
                            'U39',
                            ${mysql.escape(requestdate)} 
                          )
                         `);
      }else{
        await dbConnection.query(`create table ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days(
          id int not null auto_increment primary key,
          entry_by_user_id int,
          entry_type varchar(20), 
          app_id varchar(20),
          entry_date_time datetime
        )`);
        await dbConnection.query(`
        insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
        (
    entry_by_user_id,
    entry_type, 
    app_id,
    entry_date_time
        )
        values
        (
          ${mysql.escape(user_id)},
          'Delete',
          'U39',
          ${mysql.escape(requestdate)} 
        )
       `);
      }

      return postdata;
    } catch (error) {
      throw error;
    }
  }

  // Custom NonOperational Days

  async getCustomNonOperationalDays(
    country_code,
    customer_id,
    user_id,
    custom_for_user_category_id,
  ) {
    try {
      const dbName = `${country_code}_${customer_id}_edu_customer_db`;
      // const tableExistorNot = await dbConnection.query(`
      //       SELECT count(*) as db FROM information_schema.tables
      //       WHERE table_schema = '${dbName}'AND table_name = '39_userapp_custom_non_operational_days'
      //       LIMIT 1;
      //       `);
      // const table2ExistorNot = await dbConnection.query(`
      //       SELECT count(*) as db FROM information_schema.tables
      //       WHERE table_schema = '${dbName}'AND table_name = '39_userapp_common_non_operational_days'
      //       LIMIT 1;
      //       `);
      let getdata1: any;
      let getdata2: any;
      let getcombaineddate: any;
      if (
        (await this.helper.tableExists(
          `${dbName}`,
          `39_userapp_custom_non_operational_days`,
        )) == 1 &&
        (await this.helper.tableExists(
          `${dbName}`,
          `39_userapp_common_non_operational_days`,
        )) == 1
      ) {
        getdata1 = await dbConnection.query(`
        select *, DATE_FORMAT(new_custom_non_operational_day_date,'%Y-%m-%d') AS new_custom_non_operational_day_date from ${dbName}.39_userapp_custom_non_operational_days
        where custom_for_user_category_id = ${mysql.escape(
          custom_for_user_category_id,
        )};
        `);

        getdata2 = await dbConnection.query(`
        select *, DATE_FORMAT(common_non_operational_day_date,'%Y-%m-%d') AS common_non_operational_day_date from ${dbName}.39_userapp_common_non_operational_days;
        `);

        getcombaineddate = await dbConnection.query(`
        select *,
         DATE_FORMAT(a.new_custom_non_operational_day_date,'%Y-%m-%d') AS new_custom_non_operational_day_date, DATE_FORMAT(b.common_non_operational_day_date,'%Y-%m-%d') AS common_non_operational_day_date from ${dbName}.39_userapp_custom_non_operational_days a
        join ${dbName}.39_userapp_common_non_operational_days b on
        b.common_non_operational_day_id = a.cancelled_common_non_operational_day_id    
        where custom_for_user_category_id = ${mysql.escape(
          custom_for_user_category_id,
        )};
        `);
      } else {
        // console.log('else',(await this.helper.tableExists(
        //   `${dbName}`,
        //   `39_userapp_common_non_operational_days`,
        // )))
        if (
          (await this.helper.tableExists(
            `${dbName}`,
            `39_userapp_common_non_operational_days`,
          )) == 1
        ) {
          // console.log('39_userapp_custom_non_operational_days','getdata')

          const getdata = await dbConnection.query(`
            select *, DATE_FORMAT(common_non_operational_day_date,'%Y-%m-%d') AS common_non_operational_day_date from ${dbName}.39_userapp_common_non_operational_days;
            `);
          return getdata;
        }
        // return { combinedArray: [] };
      }

      if (getcombaineddate.length > 0) {
        if (getdata1.cancelled_common_non_operational_day_id != 0) {
          // console.log('if');
          // const getcombaineddate1 = await dbConnection.query(`
          //   select a.custom_for_user_category_id,a.is_common_holiday_cancelled,a.cancelled_common_holiday_id,b.common_holiday_id,
          //   b.common_holiday_name, DATE_FORMAT(a.new_custom_holiday_date,'%Y-%m-%d') AS new_custom_holiday_date, DATE_FORMAT(b.common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_custom_holidays a
          //   join ${dbName}.39_userapp_common_holidays b on
          //   b.common_holiday_id = a.cancelled_common_holiday_id

          //   where custom_for_user_category_id = ${mysql.escape(custom_for_user_category_id)};
          //   `);
          let pushdata2: any[] = [];
          let pushdata3: any[] = [];

          const getdata3 = await dbConnection.query(`
               select *, DATE_FORMAT(new_custom_non_operational_day_date,'%Y-%m-%d') AS new_custom_non_operational_day_date from ${dbName}.39_userapp_custom_non_operational_days
               where custom_for_user_category_id = ${mysql.escape(
                 custom_for_user_category_id,
               )} and cancelled_common_non_operational_day_id = 0;
                    `);

          let getdata4: any;

          const arr = [];
          for (let i = 0; i < getcombaineddate.length; i++) {
            arr.push(
              getcombaineddate[i].cancelled_common_non_operational_day_id,
            );
          }
          const combinedArr = [...arr];
          // console.log(combinedArr);
          getdata4 = await dbConnection.query(`
              select *, DATE_FORMAT(common_non_operational_day_date,'%Y-%m-%d') AS common_non_operational_day_date from ${dbName}.39_userapp_common_non_operational_days
              where common_non_operational_day_id NOT IN (${combinedArr.join(
                ', ',
              )});
            `);
          // console.log(getdata4);

          const combinedArray = getcombaineddate.concat(getdata3, getdata4);
          return combinedArray;
        } else {
          // console.log('else');

          // console.log("else");
          const combinedArray = getdata1.concat(getdata2);
          // console.log(combinedArray);
          return combinedArray;
        }
      } else {
        const combinedArray = getdata1.concat(getdata2);
        // console.log(combinedArray);
        return combinedArray;
      }
      // console.log(tableExistorNot[0].db);
      // if (tableExistorNot[0].db == 0) {
      // if (table2ExistorNot[0].db == 1) {
      //   const getdata = await dbConnection.query(`
      //   select *, DATE_FORMAT(common_non_operational_day_date,'%Y-%m-%d') AS common_non_operational_day_date from ${dbName}.39_userapp_common_non_operational_days;
      //   `);
      //   return getdata;
      // }
      // return { combinedArray: [] };
      //  } else {
      //   const getdata1 = await dbConnection.query(`
      //   select *, DATE_FORMAT(new_custom_non_operational_day_date,'%Y-%m-%d') AS new_custom_non_operational_day_date from ${dbName}.39_userapp_custom_non_operational_days
      //   where custom_for_user_category_id = ${mysql.escape(
      //     custom_for_user_category_id,
      //   )};
      //   `);

      //   const getdata2 = await dbConnection.query(`
      //   select *, DATE_FORMAT(common_non_operational_day_date,'%Y-%m-%d') AS common_non_operational_day_date from ${dbName}.39_userapp_common_non_operational_days;
      //   `);

      //   const getcombaineddate = await dbConnection.query(`
      //   select *,
      //    DATE_FORMAT(a.new_custom_non_operational_day_date,'%Y-%m-%d') AS new_custom_non_operational_day_date, DATE_FORMAT(b.common_non_operational_day_date,'%Y-%m-%d') AS common_non_operational_day_date from ${dbName}.39_userapp_custom_non_operational_days a
      //   join ${dbName}.39_userapp_common_non_operational_days b on
      //   b.common_non_operational_day_id = a.cancelled_common_non_operational_day_id
      //   where custom_for_user_category_id = ${mysql.escape(
      //     custom_for_user_category_id,
      //   )};
      //   `);
      // if(getdata1.cancelled_common_non_operational_day_id == getdata2.common_non_operational_day_id){

      //     let pushdata1: any[]=[];
      //     let pushdata2: any[]=[];

      //     for(let i = 0; i<getcombaineddate.length; i++){

      //         const getdata3 = await dbConnection.query(`
      //     select *, DATE_FORMAT(new_custom_non_operational_day_date,'%Y-%m-%d') AS new_custom_non_operational_day_date from ${dbName}.39_userapp_custom_non_operational_days
      //     where custom_for_user_category_id = ${mysql.escape(custom_for_user_category_id)} and cancelled_common_non_operational_day_id = 0;
      //     `);

      //         const getdata4 = await dbConnection.query(`
      //     select *, DATE_FORMAT(common_non_operational_day_date,'%Y-%m-%d') AS common_non_operational_day_date from ${dbName}.39_userapp_common_non_operational_days
      //     where common_non_operational_day_id != ${getcombaineddate[i].cancelled_common_non_operational_day_id};
      //     `);

      //     pushdata1.push(getdata3);
      //     pushdata2.push(getdata4);
      //     }
      //         const combinedArray = getcombaineddate.concat(pushdata1[0], pushdata2[0]);

      //         console.log(combinedArray);

      //         return combinedArray;
      // }else{
      //     const combinedArray = getdata1.concat(getdata2);

      //     // console.log(combinedArray);

      //     return combinedArray;
      // }

      //   if (getcombaineddate.length > 0) {
      //     if (getdata1.cancelled_common_non_operational_day_id != 0) {
      //       console.log('if');

      //       // const getcombaineddate1 = await dbConnection.query(`
      //       //   select a.custom_for_user_category_id,a.is_common_holiday_cancelled,a.cancelled_common_holiday_id,b.common_holiday_id,
      //       //   b.common_holiday_name, DATE_FORMAT(a.new_custom_holiday_date,'%Y-%m-%d') AS new_custom_holiday_date, DATE_FORMAT(b.common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_custom_holidays a
      //       //   join ${dbName}.39_userapp_common_holidays b on
      //       //   b.common_holiday_id = a.cancelled_common_holiday_id

      //       //   where custom_for_user_category_id = ${mysql.escape(custom_for_user_category_id)};
      //       //   `);
      //       let pushdata2: any[] = [];
      //       let pushdata3: any[] = [];

      //       const getdata3 = await dbConnection.query(`
      //            select *, DATE_FORMAT(new_custom_non_operational_day_date,'%Y-%m-%d') AS new_custom_non_operational_day_date from ${dbName}.39_userapp_custom_non_operational_days
      //            where custom_for_user_category_id = ${mysql.escape(
      //              custom_for_user_category_id,
      //            )} and cancelled_common_non_operational_day_id = 0;
      //                 `);

      //       let getdata4: any;

      //       const arr = [];
      //       for (let i = 0; i < getcombaineddate.length; i++) {
      //         arr.push(
      //           getcombaineddate[i].cancelled_common_non_operational_day_id,
      //         );
      //       }
      //       const combinedArr = [...arr];
      //       console.log(combinedArr);
      //       getdata4 = await dbConnection.query(`
      //           select *, DATE_FORMAT(common_non_operational_day_date,'%Y-%m-%d') AS common_non_operational_day_date from ${dbName}.39_userapp_common_non_operational_days
      //           where common_non_operational_day_id NOT IN (${combinedArr.join(
      //             ', ',
      //           )});
      //         `);
      //       console.log(getdata4);

      //       const combinedArray = getcombaineddate.concat(getdata3, getdata4);
      //       return combinedArray;
      //     } else {
      //       console.log('else');

      //       // console.log("else");
      //       const combinedArray = getdata1.concat(getdata2);
      //       // console.log(combinedArray);
      //       return combinedArray;
      //     }
      //   } else {
      //     const combinedArray = getdata1.concat(getdata2);
      //     // console.log(combinedArray);
      //     return combinedArray;
      //   }
      // }
    } catch (error) {
      throw error;
    }
  }

  async postCustomNonOperationalDays(
    country_code,
    customer_id,
    timezone,
    user_id,
    custom_for_user_category_id,
    new_custom_non_operational_day_date,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;

      if (
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `39_userapp_custom_non_operational_days`,
        )) == 1
      ) {
      } else {
        await dbConnection.query(`
        create table ${dbName}.39_userapp_custom_non_operational_days(
          custom_non_operational_day_id int primary key auto_increment,
          custom_for_user_category_id varchar(255),
          is_common_non_operational_day_cancelled tinyint(1),
          cancelled_common_non_operational_day_id int,
          new_custom_non_operational_day_date date
            )         
        `);
      }
      const checkdata = await dbConnection.query(`
        select count(*) as count from ${dbName}.39_userapp_custom_non_operational_days  
        where new_custom_non_operational_day_date = ${mysql.escape(
          new_custom_non_operational_day_date,
        )} and custom_for_user_category_id = ${mysql.escape(
        custom_for_user_category_id,
      )};
     
        `);
      // console.log(checkdata[0].count);

      if (checkdata[0].count < 1) {
        // console.log('ddd');

        const postdata = await dbConnection.query(`
        insert into ${dbName}.39_userapp_custom_non_operational_days(	 
            custom_for_user_category_id,	
            is_common_non_operational_day_cancelled,	
            cancelled_common_non_operational_day_id,
            new_custom_non_operational_day_date
            )
        values(
        ${mysql.escape(custom_for_user_category_id)},
        0,
        0,
        ${mysql.escape(new_custom_non_operational_day_date)}
        );
        `);

        // aduit trail
        if (
          (await this.helper.tableExists(
            `${country_code}_${customer_id}_edu_customer_db`,
            `audit_trail_for_manage_holidays_non_operational_days`,
          )) == 1
        ) {
          await dbConnection.query(`
          insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
          (
      entry_by_user_id,
      entry_type, 
      app_id,
      entry_date_time
          )
          values
          (
            ${mysql.escape(user_id)},
            'Insert',
            'U39',
            ${mysql.escape(requestdate)} 
          )
         `);
        } else {
          await dbConnection.query(`
              create table ${dbName}.audit_trail_for_manage_holidays_non_operational_days(
                id int not null auto_increment primary key,
                entry_by_user_id int,
                entry_type varchar(50),
                app_id varchar(5),
                entry_date_time datetime
                )
              `);

          await dbConnection.query(`
         insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
         (
     entry_by_user_id,
     entry_type, 
     app_id,
     entry_date_time
         )
         values
         (
           ${mysql.escape(user_id)},
           'Insert',
           'U39',
           ${mysql.escape(requestdate)} 
         )
        `);
        }

        return postdata;
      } else {
        // console.log('sss');
      }
    } catch (error) {
      throw error;
    }
  }

  async putCustomNonOperationalDays(
    country_code,
    customer_id,
    timezone,
    user_id,
    custom_non_operational_day_id,
    new_custom_non_operational_day_date,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;
      // console.log(new_custom_non_operational_day_date,'new_custom_non_operational_day_date')
      const postdata = await dbConnection.query(`
        UPDATE ${dbName}.39_userapp_custom_non_operational_days
        SET new_custom_non_operational_day_date = ${mysql.escape(
          new_custom_non_operational_day_date,
        )}
        WHERE custom_non_operational_day_id = ${mysql.escape(
          custom_non_operational_day_id,
        )};       
        `);

      // aduit trail

      if (
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `audit_trail_for_manage_holidays_non_operational_days`,
        )) == 1
      ) {
        await dbConnection.query(`
            insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
            (
        entry_by_user_id,
        entry_type, 
        app_id,
        entry_date_time
            )
            values
            (
              ${mysql.escape(user_id)},
              'Update',
              'U39',
              ${mysql.escape(requestdate)} 
            )
           `);
      } else {
        await dbConnection.query(`
              create table ${dbName}.audit_trail_for_manage_holidays_non_operational_days(
                id int not null auto_increment primary key,
                entry_by_user_id int,
                entry_type varchar(50),
                app_id varchar(5),
                entry_date_time datetime
                )
              `);
        const a = await dbConnection.query(`
                    insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
                    (
                entry_by_user_id,
                entry_type, 
                app_id,
                entry_date_time
                    )
                    values
                    (
                      ${mysql.escape(user_id)},
                      'Update',
                      'U39',
                      ${mysql.escape(requestdate)} 
                    )
                   `);
      }

      return postdata;
    } catch (error) {
      throw error;
    }
  }

  async deleteCustomNonOperationalDays(
    country_code,
    customer_id,
    timezone,
    user_id,
    custom_non_operational_day_id,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;

      const postdata = await dbConnection.query(`     
        delete from ${dbName}.39_userapp_custom_non_operational_days
        where custom_non_operational_day_id =  ${mysql.escape(
          custom_non_operational_day_id,
        )};
        `);

      // aduit trail

      if (
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `audit_trail_for_manage_holidays_non_operational_days`,
        )) == 1
      ) {
        const a = await dbConnection.query(`
        insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
        (
    entry_by_user_id,
    entry_type, 
    app_id,
    entry_date_time
        )
        values
        (
          ${mysql.escape(user_id)},
          'Delete',
          'U39',
          ${mysql.escape(requestdate)} 
        )
       `);
      } else {
        await dbConnection.query(`
              create table ${dbName}.audit_trail_for_manage_holidays_non_operational_days(
                id int not null auto_increment primary key,
                entry_by_user_id int,
                entry_type varchar(50),
                app_id varchar(5),
                entry_date_time datetime
                )
              `);
        const a = await dbConnection.query(`
                insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
                (
            entry_by_user_id,
            entry_type, 
            app_id,
            entry_date_time
                )
                values
                (
                  ${mysql.escape(user_id)},
                  'Delete',
                  'U39',
                  ${mysql.escape(requestdate)} 
                )
               `);
      }

      return postdata;
    } catch (error) {
      throw error;
    }
  }

  async getaduittrail(
    country_code,
    customer_id,
    timezone,
    user_id,
    page_no,
    per_page,
  ) {
    try {
      let offset = page_no * per_page;

      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;
      // const tableExistorNot = await dbConnection.query(`
      // SELECT count(*) as db FROM information_schema.tables
      // WHERE table_schema = '${dbName}'AND table_name = '39_userapp_common_non_operational_days'
      // LIMIT 1;
      // `);
      // console.log(tableExistorNot[0].db);

      if (
        (await this.helper.tableExists(
          `${dbName}`,
          `audit_trail_for_manage_holidays_non_operational_days`,
        )) == 1
      ) {
        const postdata = await dbConnection.query(`     
        SELECT * FROM ${dbName}.audit_trail_for_manage_holidays_non_operational_days
        where entry_by_user_id  >  0 * 5 
        order by entry_by_user_id desc LIMIT ${offset}, ${per_page};
        `);
        const count = await dbConnection.query(`     
        SELECT  count(*) as count FROM ${dbName}.audit_trail_for_manage_holidays_non_operational_days
        `);
        // console.log(postdata);
        return { postdata, count };
      } else {
        return { postdata: [], count: 0 };
      }
      // if (tableExistorNot[0].db == 0) {
      //   return { postdata: [], count: 0 };
      // } else {
      //   const postdata = await dbConnection.query(`
      //   SELECT * FROM ${dbName}.audit_trail_for_manage_holidays_non_operational_days
      //   where entry_by_user_id  >  0 * 5
      //   order by entry_by_user_id desc LIMIT ${offset}, ${per_page};
      //   `);

      //   const count = await dbConnection.query(`
      //   SELECT  count(*) as count FROM ${dbName}.audit_trail_for_manage_holidays_non_operational_days
      //   `);
      //   console.log(postdata);

      //   return { postdata, count };
      // }
    } catch (error) {
      throw error;
    }
  }

  async postCancelNonOperationalDays(
    country_code,
    customer_id,
    timezone,
    user_id,
    custom_for_user_category_id,
    cancelled_common_non_operational_day_id,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;

      // console.log('ddd');
      // const tableExistorNot = await dbConnection.query(`
      // SELECT count(*) as db FROM information_schema.tables
      // WHERE table_schema = '${dbName}'AND table_name = '39_userapp_custom_non_operational_days'
      // LIMIT 1;
      // `);
      // const audittableExistorNot = await dbConnection.query(`
      // SELECT count(*) as db FROM information_schema.tables
      // WHERE table_schema = '${dbName}'AND table_name = 'audit_trail_for_manage_holidays_non_operational_days'
      // LIMIT 1;
      // `);
      let postdata: any;
      if (
        (await this.helper.tableExists(
          `${dbName}`,
          `39_userapp_custom_non_operational_days`,
        )) == 1
      ) {
        postdata = await dbConnection.query(`
        insert into ${dbName}.39_userapp_custom_non_operational_days(	 
            custom_for_user_category_id,	
            is_common_non_operational_day_cancelled,	
            cancelled_common_non_operational_day_id,
            new_custom_non_operational_day_date
            )
        values(
        ${mysql.escape(custom_for_user_category_id)},
        1,
        ${mysql.escape(cancelled_common_non_operational_day_id)},
        null
        );
        `);
      } else {
        await dbConnection.query(`
        create table ${dbName}.39_userapp_custom_non_operational_days(
          custom_non_operational_day_id int primary key auto_increment,
          custom_for_user_category_id varchar(255),
          is_common_non_operational_day_cancelled tinyint(1),
          cancelled_common_non_operational_day_id int,
          new_custom_non_operational_day_date date
            )         
        `);

        postdata = await dbConnection.query(`
        insert into ${dbName}.39_userapp_custom_non_operational_days(	 
            custom_for_user_category_id,	
            is_common_non_operational_day_cancelled,	
            cancelled_common_non_operational_day_id,
            new_custom_non_operational_day_date
            )
        values(
        ${mysql.escape(custom_for_user_category_id)},
        1,
        ${mysql.escape(cancelled_common_non_operational_day_id)},
        null
        );
        `);
      }

      if (
        (await this.helper.tableExists(
          `${dbName}`,
          `audit_trail_for_manage_holidays_non_operational_days`,
        )) == 1
      ) {
        await dbConnection.query(`
            insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
            (
        entry_by_user_id,
        entry_type, 
        app_id,
        entry_date_time
            )
            values
            (
              ${mysql.escape(user_id)},
              'Insert',
              'U39',
              ${mysql.escape(requestdate)} 
            )
           `);
      } else {
        await dbConnection.query(`
        create table ${dbName}.audit_trail_for_manage_holidays_non_operational_days(
          entry_by_user_id int,
          entry_type varchar(50),
          app_id varchar(5),
          entry_date_time datetime
          )
        `);

        await dbConnection.query(`
            insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
            (
        entry_by_user_id,
        entry_type, 
        app_id,
        entry_date_time
            )
            values
            (
              ${mysql.escape(user_id)},
              'Insert',
              'U39',
              ${mysql.escape(requestdate)} 
            )
           `);
      }
      // if (tableExistorNot[0].db == 0) {
      // const create = await dbConnection.query(`
      // create table ${dbName}.39_userapp_common_non_operational_days(
      //   custom_non_operational_day_id int primary key auto_increment,
      //   custom_for_user_category_id varchar(255),
      //   is_common_non_operational_day_cancelled tinyint(1),
      //   cancelled_common_non_operational_day_id int,
      //   new_custom_non_operational_day_date date
      //     )
      // `);
      // if (audittableExistorNot[0].db == 0) {
      //   const create_audit_table = await dbConnection.query(`
      // create table ${dbName}.audit_trail_for_manage_holidays_non_operational_days(
      //   entry_by_user_id int,
      //   entry_type varchar(50),
      //   app_id varchar(5),
      //   entry_date_time datetime
      //   )
      // `);
      // }
      // const postdata = await dbConnection.query(`
      // insert into ${dbName}.39_userapp_custom_non_operational_days(
      //     custom_for_user_category_id,
      //     is_common_non_operational_day_cancelled,
      //     cancelled_common_non_operational_day_id,
      //     new_custom_non_operational_day_date
      //     )
      // values(
      // ${mysql.escape(custom_for_user_category_id)},
      // 1,
      // ${mysql.escape(cancelled_common_non_operational_day_id)},
      // null
      // );
      // `);

      //     // aduit trail
      //     const a = await dbConnection.query(`
      //     insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
      //     (
      // entry_by_user_id,
      // entry_type,
      // app_id,
      // entry_date_time
      //     )
      //     values
      //     (
      //       ${mysql.escape(user_id)},
      //       'Insert',
      //       'U39',
      //       ${mysql.escape(requestdate)}
      //     )
      //    `);

      //   return postdata;
      // } else {
      //   const postdata = await dbConnection.query(`
      //       insert into ${dbName}.39_userapp_custom_non_operational_days(
      //           custom_for_user_category_id,
      //           is_common_non_operational_day_cancelled,
      //           cancelled_common_non_operational_day_id,
      //           new_custom_non_operational_day_date
      //           )
      //       values(
      //       ${mysql.escape(custom_for_user_category_id)},
      //       1,
      //       ${mysql.escape(cancelled_common_non_operational_day_id)},
      //       null
      //       );
      //       `);

      // aduit trail
      // const a = await dbConnection.query(`
      //     insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
      //     (
      // entry_by_user_id,
      // entry_type,
      // app_id,
      // entry_date_time
      //     )
      //     values
      //     (
      //       ${mysql.escape(user_id)},
      //       'Insert',
      //       'U39',
      //       ${mysql.escape(requestdate)}
      //     )
      //    `);

      return postdata;
      // }
    } catch (error) {
      throw error;
    }
  }
}
