/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/app.module';
import * as mysql from 'mysql2';
import { query } from 'express';
import { log } from 'console';
import { notEquals } from 'class-validator';
import { notEqual } from 'assert';
import { HelperService } from 'src/common/services/helper/helper.service';
// import * as countryCityStateJson from 'countrycitystatejson';
const { DateTime } = require('luxon');

@Injectable()
export class AddEditHolidaysService {
  constructor(
    // private _dateTimeService: DateTimeService,
    private helper: HelperService,
  ) {}
  async getCommonHolidayscount(country_code, customer_id, user_id) {
    try {
      const dbName = `${country_code}_${customer_id}_edu_customer_db`;
      if (
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `39_userapp_common_holidays`,
        )) == 1
      ) {
        const getdata = await dbConnection.query(`
        select *, DATE_FORMAT(common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_common_holidays;
        `);
        return { getdata: [] };
      } else {
      }
      //   const tableExistorNot = await dbConnection.query(`
      // SELECT count(*) as db FROM information_schema.tables
      // WHERE table_schema = '${dbName}'AND table_name = '39_userapp_common_holidays'
      // LIMIT 1;
      // `);
      // console.log(tableExistorNot[0].db);
      // if (tableExistorNot[0].db == 0) {
      //   return { getdata: [] };
      // } else {
      //   const getdata = await dbConnection.query(`
      //       select *, DATE_FORMAT(common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_common_holidays;
      //       `);

      //   return getdata;
      // }
    } catch (error) {
      throw error;
    }
  }

  async getCommonHolidays(
    country_code,
    customer_id,
    user_id,
    page_no,
    per_page,
  ) {
    try {
      // let offset = page_no * per_page;

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;
      if (
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `39_userapp_common_holidays`,
        )) == 1
      ) {
        const tableExistorNot = await dbConnection.query(`
          SELECT count(*) as db FROM information_schema.tables
          WHERE table_schema = '${dbName}'AND table_name = '39_userapp_common_holidays'
          LIMIT 1;   
          `);
        // console.log('Procceed');

        const getdata = await dbConnection.query(`
                  select *, DATE_FORMAT(common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_common_holidays
                  where common_holiday_date  >  0 * 5 
                  order by common_holiday_date ;
                  `);

        const count = await dbConnection.query(`
            select count(*) as count from ${dbName}.39_userapp_common_holidays;
            `);
        const all_values = await dbConnection.query(`
            select *, DATE_FORMAT(common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_common_holidays
            order by common_holiday_date;`);

        return { getdata, count, all_values };
      }
    } catch (error) {
      throw error;
    }
  }

  async postCommonHolidays(
    country_code,
    customer_id,
    timezone,
    user_id,
    common_holiday_date,
    common_holiday_name,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;
//       const tableExistorNot = await dbConnection.query(`
//     SELECT count(*) as db FROM information_schema.tables
//     WHERE table_schema = '${dbName}'AND table_name = '39_userapp_common_holidays'
//     LIMIT 1;   
//     `);
//       const audittableExistorNot = await dbConnection.query(`
//     SELECT count(*) as db FROM information_schema.tables
//     WHERE table_schema = '${dbName}'AND table_name = 'audit_trail_for_manage_holidays_non_operational_days'
//     LIMIT 1;   
//     `);
//       console.log(tableExistorNot[0].db);
//       if (tableExistorNot[0].db == 0) {
//         const create_table = await dbConnection.query(`
//       create table ${dbName}.39_userapp_common_holidays(
//         common_holiday_id int primary key auto_increment,
//         common_holiday_date date,
//         common_holiday_name varchar(50)
//         )   
//       `);
//         if (audittableExistorNot[0].db == 0) {
//           const create_audit_table = await dbConnection.query(`
//       create table ${dbName}.audit_trail_for_manage_holidays_non_operational_days(
//         entry_by_user_id int,
//         entry_type varchar(50),
//         app_id varchar(5),
//         entry_date_time datetime
//         )
//       `);
//         }

//         const postdata = await dbConnection.query(`
//   insert into ${dbName}.39_userapp_common_holidays
//           (
//           common_holiday_date,
//           common_holiday_name	
//           )
//           value(
//           ${mysql.escape(common_holiday_date)},
//           ${mysql.escape(common_holiday_name)}
//           );            
//       `);

//         // aduit trail
//         const a = await dbConnection.query(`
//   insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
//   (
// entry_by_user_id,
// entry_type, 
// app_id,
// entry_date_time
//   )
//   values
//   (
//     ${mysql.escape(user_id)},
//     'Insert',
//     'U39',
//     ${mysql.escape(requestdate)} 
//   )
//  `);
//         return postdata;
//       } else {
//         const checkdata = await dbConnection.query(`
//             select count(*) as count from ${dbName}.39_userapp_common_holidays 
//             where common_holiday_date = ${mysql.escape(common_holiday_date)};
         
//             `);
//         console.log(checkdata[0].count);

//         if (checkdata[0].count < 1) {
//           console.log('ddd');

//           const postdata = await dbConnection.query(`
//             insert into ${dbName}.39_userapp_common_holidays(
//                 common_holiday_date,
//                 common_holiday_name	
//                 )
//                 value(
//                 ${mysql.escape(common_holiday_date)},
//                 ${mysql.escape(common_holiday_name)}
//                 );            
//             `);

//           // aduit trail
//           const a = await dbConnection.query(`
//         insert into ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
//         (
//     entry_by_user_id,
//     entry_type, 
//     app_id,
//     entry_date_time
//         )
//         values
//         (
//           ${mysql.escape(user_id)},
//           'Insert',
//           'U39',
//           ${mysql.escape(requestdate)} 
//         )
//        `);
//           return postdata;
//         } else {
//           console.log('sss');
//         }
//       }

      if((await this.helper.tableExists(`${dbName}`,`39_userapp_common_holidays`))==1){
        // 39_userapp_common_holidays 
        await dbConnection.query(`
    insert into ${dbName}.39_userapp_common_holidays
            (
            common_holiday_date,
            common_holiday_name	
            )
            value(
            ${mysql.escape(common_holiday_date)},
            ${mysql.escape(common_holiday_name)}
            );            
        `);
        // audit_trail
        if((await this.helper.tableExists(`${dbName}`,`audit_trail_for_manage_holidays_non_operational_days`))==1){
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
        'Insert',
        'U39',
        ${mysql.escape(requestdate)} 
      )
     `);
        }else{
          await dbConnection.query(`
          create table ${dbName}.audit_trail_for_manage_holidays_non_operational_days(
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
        'Insert',
        'U39',
        ${mysql.escape(requestdate)} 
      )
     `);
        }
      }else{
        // 39_userapp_common_holidays 
        await dbConnection.query(`
        create table ${dbName}.39_userapp_common_holidays(
          common_holiday_id int primary key auto_increment,
          common_holiday_date date,
          common_holiday_name varchar(50)
          )   
        `);
  
        await dbConnection.query(`
    insert into ${dbName}.39_userapp_common_holidays
            (
            common_holiday_date,
            common_holiday_name	
            )
            value(
            ${mysql.escape(common_holiday_date)},
            ${mysql.escape(common_holiday_name)}
            );            
        `);

        // audit_trail 
        if((await this.helper.tableExists(`${dbName}`,`audit_trail_for_manage_holidays_non_operational_days`))==1){
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
        'Insert',
        'U39',
        ${mysql.escape(requestdate)} 
      )
     `);
        }else{
          await dbConnection.query(`
          create table ${dbName}.audit_trail_for_manage_holidays_non_operational_days(
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
        'Insert',
        'U39',
        ${mysql.escape(requestdate)} 
      )
     `);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async putCommonHolidays(
    country_code,
    customer_id,
    timezone,
    user_id,
    common_holiday_id,
    common_holiday_date,
    common_holiday_name,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;
      let postdata: any;
      if (
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `39_userapp_common_holidays`,
        )) == 1
      ) {
        postdata = await dbConnection.query(`
              UPDATE ${dbName}.39_userapp_common_holidays
              SET common_holiday_date = ${mysql.escape(
                common_holiday_date,
              )}, common_holiday_name= ${mysql.escape(common_holiday_name)}
              WHERE common_holiday_id = ${mysql.escape(
                common_holiday_id,
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
                  'Update',
                  'U39',
                  ${mysql.escape(requestdate)} 
                )
               `);
        } else {
          await dbConnection.query(`create table ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
                (
                  id int not null auto_increment primary key,
            entry_by_user_id int,
            entry_type varchar(15), 
            app_id varchar(15),
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
                    'Update',
                    'U39',
                    ${mysql.escape(requestdate)} 
                  )
                 `);
        }
      }

      return postdata;
    } catch (error) {
      throw error;
    }
  }

  async deleteCommonHolidays(
    country_code,
    customer_id,
    timezone,
    user_id,
    common_holiday_id,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;
      let postdata: any;
      if (
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `39_userapp_common_holidays`,
        )) == 1
      ) {
        postdata = await dbConnection.query(`
              delete from ${dbName}.39_userapp_common_holidays
              where common_holiday_id = ${mysql.escape(
                common_holiday_id,
              )};          
              `);
        if (
          (await this.helper.tableExists(
            `${country_code}_${customer_id}_edu_customer_db`,
            `audit_trail_for_manage_holidays_non_operational_days`,
          )) == 1
        ) {
          // aduit trail
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
          await dbConnection.query(`create table ${country_code}_${customer_id}_edu_customer_db.audit_trail_for_manage_holidays_non_operational_days
                 (
                   id int not null auto_increment primary key,
             entry_by_user_id int,
             entry_type varchar(15), 
             app_id varchar(15),
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
      }

      return postdata;
    } catch (error) {
      throw error;
    }
  }

  async getAllStudentCategories(customer_id: any, country_code: any) {
    // Database and Table Name
    const dbName1 = `${country_code}_${customer_id}_edu_customer_db`;
    const tableName1 = `2_userapp_user_category`;

    // Global Variable Declaration

    // Code
    try {
      if (
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `2_userapp_user_category`,
        )) == 1
      ) {
        // console.log(tableExistorNot[0].db);
        const syllabusData = await dbConnection.query(`
            SELECT * FROM ${dbName1}.${tableName1}
            `);
        let data;
        if (syllabusData.length > 1) {
          data = await this.treeConstruct(syllabusData);
          return data;
        }

        const obj = syllabusData[0];
        const pair = { children: [] };
        const objData = { ...obj, ...pair };
        if (obj !== undefined) {
          return [objData];
        }
        return [];
      }
    } catch (error) {
      throw error;
    }
  }
  treeConstruct(treeData) {
    let constructedTree = [];
    for (let i of treeData) {
      let treeObj = i;
      let assigned = false;
      this.constructTree(constructedTree, treeObj, assigned);
    }
    return constructedTree;
  }

  constructTree(constructedTree, treeObj, assigned) {
    if (treeObj.parent_user_category_id == null) {
      treeObj.children = [];
      constructedTree.push(treeObj);
      return true;
    } else if (
      treeObj.parent_user_category_id == constructedTree.user_category_id
    ) {
      treeObj.children = [];
      constructedTree.children.push(treeObj);
      return true;
    } else {
      if (constructedTree.children != undefined) {
        for (let index = 0; index < constructedTree.children.length; index++) {
          let constructedObj = constructedTree.children[index];
          if (assigned == false) {
            assigned = this.constructTree(constructedObj, treeObj, assigned);
          }
        }
      } else {
        for (let index = 0; index < constructedTree.length; index++) {
          let constructedObj = constructedTree[index];
          if (assigned == false) {
            assigned = this.constructTree(constructedObj, treeObj, assigned);
          }
        }
      }
      return false;
    }
  }

  async getCategoryFullName(customer_id, country_code, userCategoryId: string) {
    // Database and Table Name
    const dbName1 = `${country_code}_${customer_id}_edu_customer_db`;
    const tableName1 = `2_userapp_user_category`;

    // Global Variable Declaration

    // Code
    try {
      let result1 = userCategoryId;
      let studentCategoryFullName: any[] = [];

      while (result1 != null) {
        const category = await dbConnection.query(`
          SELECT * FROM ${dbName1}.${tableName1}
          WHERE user_category_id=${mysql.escape(result1)}
        `);

        // Check if a category was found
        if (category.length > 0) {
          studentCategoryFullName.push(category[0].user_category_name);
          result1 = category[0].parent_user_category_id;
        } else {
          // If no category was found, exit the loop
          result1 = null;
        }
      }
      const output = {
        user_category_id: userCategoryId,
        student_category_name: studentCategoryFullName.join('/'),
      };
      return output;
    } catch (error) {
      throw error;
    }
  }

  // Custom Holidays

  async getCustomHolidays(
    country_code,
    customer_id,
    user_id,
    custom_for_user_category_id,
  ) {
    try {
      const dbName = `${country_code}_${customer_id}_edu_customer_db`;

      // const tableExistorNot = await dbConnection.query(`
      // SELECT count(*) as db FROM information_schema.tables
      // WHERE table_schema = '${dbName}'AND table_name = '39_userapp_custom_holidays'
      // LIMIT 1;
      // `);
      // const table2ExistorNot = await dbConnection.query(`
      // SELECT count(*) as db FROM information_schema.tables
      // WHERE table_schema = '${dbName}'AND table_name = '39_userapp_common_holidays'
      // LIMIT 1;
      // `);
      if (
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `39_userapp_custom_holidays`,
        )) == 1 ||
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `39_userapp_common_holidays`,
        ))
      ) {
        if (
          (await this.helper.tableExists(
            `${country_code}_${customer_id}_edu_customer_db`,
            `39_userapp_custom_holidays`,
          )) == 1 &&
          (await this.helper.tableExists(
            `${country_code}_${customer_id}_edu_customer_db`,
            `39_userapp_common_holidays`,
          )) == 1
        ) {
          const getdata1 = await dbConnection.query(`
        select *, DATE_FORMAT(new_custom_holiday_date,'%Y-%m-%d') AS new_custom_holiday_date from ${dbName}.39_userapp_custom_holidays
        where custom_for_user_category_id = ${mysql.escape(
          custom_for_user_category_id,
        )};
        `);
          let getdata2: any;
          let getcombaineddate: any;
          if (
            (await this.helper.tableExists(
              `${country_code}_${customer_id}_edu_customer_db`,
              `39_userapp_common_holidays`,
            )) == 1
          ) {
            getdata2 = await dbConnection.query(`
            select *, DATE_FORMAT(common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_common_holidays;
            `);
            getcombaineddate = await dbConnection.query(`
           select a.custom_for_user_category_id,a.is_common_holiday_cancelled,a.cancelled_common_holiday_id,b.common_holiday_id,
           b.common_holiday_name, DATE_FORMAT(a.new_custom_holiday_date,'%Y-%m-%d') AS new_custom_holiday_date, DATE_FORMAT(b.common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_custom_holidays a
           join ${dbName}.39_userapp_common_holidays b on
           b.common_holiday_id = a.cancelled_common_holiday_id
           where custom_for_user_category_id = ${mysql.escape(
             custom_for_user_category_id,
           )};
    
            `);
          }
          // console.log(getdata1.length);
          // console.log(getcombaineddate,'getcombaineddate');

          if (getcombaineddate.length > 0) {
            if (getdata1.cancelled_common_holiday_id != 0) {
              // console.log('if');
              const getdata3 = await dbConnection.query(`
          select *, DATE_FORMAT(new_custom_holiday_date,'%Y-%m-%d') AS new_custom_holiday_date from ${dbName}.39_userapp_custom_holidays
          where custom_for_user_category_id = ${mysql.escape(
            custom_for_user_category_id,
          )} and cancelled_common_holiday_id = 0;
          `);

              let getdata4: any;

              const arr = [];
              for (let i = 0; i < getcombaineddate.length; i++) {
                arr.push(getcombaineddate[i].common_holiday_id);
              }
              const combinedArr = [...arr];
              // console.log(combinedArr);
              getdata4 = await dbConnection.query(`
        select *, DATE_FORMAT(common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_common_holidays
        where common_holiday_id NOT IN (${combinedArr.join(', ')});
        `);
              // console.log(getdata4);

              const combinedArray = getcombaineddate.concat(getdata3, getdata4);
              return combinedArray;
            } else {
              // console.log('else');
              const combinedArray = getdata1.concat(getdata2);
              return combinedArray;
            }
          } else {
            const combinedArray = getdata1.concat(getdata2);
            return combinedArray;
          }
        } else if (
          (await this.helper.tableExists(
            `${country_code}_${customer_id}_edu_customer_db`,
            `39_userapp_common_holidays`,
          )) == 1
        ) {
          const getdata = await dbConnection.query(`
        select *, DATE_FORMAT(common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_common_holidays;
        `);
          return getdata;
        }
      }
      // console.log(tableExistorNot[0].db);
      // if (tableExistorNot[0].db == 0 || table2ExistorNot[0].db == 0) {
      //   if (table2ExistorNot[0].db == 1) {
      //     const getdata = await dbConnection.query(`
      //   select *, DATE_FORMAT(common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_common_holidays;
      //   `);
      //     return getdata;
      //   }
      //   return { combinedArray: [] };
      // } else {
      //   const getdata1 = await dbConnection.query(`
      //   select *, DATE_FORMAT(new_custom_holiday_date,'%Y-%m-%d') AS new_custom_holiday_date from ${dbName}.39_userapp_custom_holidays
      //   where custom_for_user_category_id = ${mysql.escape(
      //     custom_for_user_category_id,
      //   )};
      //   `);

      //   const getdata2 = await dbConnection.query(`
      //   select *, DATE_FORMAT(common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_common_holidays;
      //   `);
      //   console.log(getdata1.length);

      //   const getcombaineddate = await dbConnection.query(`
      //   select a.custom_for_user_category_id,a.is_common_holiday_cancelled,a.cancelled_common_holiday_id,b.common_holiday_id,
      //   b.common_holiday_name, DATE_FORMAT(a.new_custom_holiday_date,'%Y-%m-%d') AS new_custom_holiday_date, DATE_FORMAT(b.common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_custom_holidays a
      //   join ${dbName}.39_userapp_common_holidays b on
      //   b.common_holiday_id = a.cancelled_common_holiday_id

      //   where custom_for_user_category_id = ${mysql.escape(
      //     custom_for_user_category_id,
      //   )};
      //   `);
      //   console.log(getcombaineddate);

      //   if (getcombaineddate.length > 0) {
      //     if (getdata1.cancelled_common_holiday_id != 0) {
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
      //     select *, DATE_FORMAT(new_custom_holiday_date,'%Y-%m-%d') AS new_custom_holiday_date from ${dbName}.39_userapp_custom_holidays
      //     where custom_for_user_category_id = ${mysql.escape(
      //       custom_for_user_category_id,
      //     )} and cancelled_common_holiday_id = 0;
      //     `);

      //       let getdata4: any;

      //       const arr = [];
      //       for (let i = 0; i < getcombaineddate.length; i++) {
      //         arr.push(getcombaineddate[i].common_holiday_id);
      //       }
      //       const combinedArr = [...arr];
      //       console.log(combinedArr);
      //       getdata4 = await dbConnection.query(`
      //   select *, DATE_FORMAT(common_holiday_date,'%Y-%m-%d') AS common_holiday_date from ${dbName}.39_userapp_common_holidays
      //   where common_holiday_id NOT IN (${combinedArr.join(', ')});
      //   `);
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

  async postCustomHolidays(
    country_code,
    customer_id,
    timezone,
    user_id,
    custom_for_user_category_id,
    new_custom_holiday_date,
    new_custom_holiday_name,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;

      // const tableExistorNot = await dbConnection.query(`
      // SELECT count(*) as db FROM information_schema.tables
      // WHERE table_schema = '${dbName}'AND table_name = '39_userapp_custom_holidays'
      // LIMIT 1;
      // `);
      // const audittableExistorNot = await dbConnection.query(`
      // SELECT count(*) as db FROM information_schema.tables
      // WHERE table_schema = '${dbName}'AND table_name = 'audit_trail_for_manage_holidays_non_operational_days'
      // LIMIT 1;
      // `);

      if (
        (await this.helper.tableExists(
          `${country_code}_${customer_id}_edu_customer_db`,
          `39_userapp_custom_holidays`,
        )) == 1
      ) {
        const checkdata = await dbConnection.query(`
        select count(*) as count from ${dbName}.39_userapp_custom_holidays  
        where new_custom_holiday_date = ${mysql.escape(
          new_custom_holiday_date,
        )} and custom_for_user_category_id = ${mysql.escape(
          custom_for_user_category_id,
        )};
        `);
        if (checkdata[0].count < 1) {
          const postdata = await dbConnection.query(`
        insert into ${dbName}.39_userapp_custom_holidays  (	 
          custom_for_user_category_id,
          is_common_holiday_cancelled,
          cancelled_common_holiday_id,
          new_custom_holiday_name,
          new_custom_holiday_date
          )
          values(
          ${mysql.escape(custom_for_user_category_id)},
          0,
          0,
          ${mysql.escape(new_custom_holiday_name)},
          ${mysql.escape(new_custom_holiday_date)}
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
        }
      } else {
        await dbConnection.query(`
        create table  ${dbName}.39_userapp_custom_holidays(
          custom_holiday_id int primary key auto_increment,
          custom_for_user_category_id varchar(255),
          is_common_holiday_cancelled tinyint(1),
          cancelled_common_holiday_id int,
          new_custom_holiday_name varchar(50),
          new_custom_holiday_date date    
          ) 
        `);
        const checkdata = await dbConnection.query(`
        select count(*) as count from ${dbName}.39_userapp_custom_holidays  
        where new_custom_holiday_date = ${mysql.escape(
          new_custom_holiday_date,
        )} and custom_for_user_category_id = ${mysql.escape(
          custom_for_user_category_id,
        )};
     
        `);
        // console.log(checkdata[0].count);

        if (checkdata[0].count < 1) {
          const postdata = await dbConnection.query(`
        insert into ${dbName}.39_userapp_custom_holidays  (	 
          custom_for_user_category_id,
          is_common_holiday_cancelled,
          cancelled_common_holiday_id,
          new_custom_holiday_name,
          new_custom_holiday_date
          )
          values(
          ${mysql.escape(custom_for_user_category_id)},
          0,
          0,
          ${mysql.escape(new_custom_holiday_name)},
          ${mysql.escape(new_custom_holiday_date)}
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
        }
      }
      // console.log(tableExistorNot[0].db);
      //   if (tableExistorNot[0].db == 0) {
      //     const create = await dbConnection.query(`
      //     create table  ${dbName}.39_userapp_custom_holidays(
      //       custom_holiday_id int primary key auto_increment,
      //       custom_for_user_category_id varchar(255),
      //       is_common_holiday_cancelled tinyint(1),
      //       cancelled_common_holiday_id int,
      //       new_custom_holiday_name varchar(50),
      //       new_custom_holiday_date date
      //       )
      //     `);
      //     if (audittableExistorNot[0].db == 0) {
      //       const create_audit_table = await dbConnection.query(`
      //     create table ${dbName}.audit_trail_for_manage_holidays_non_operational_days(
      //       id int not null auto_increment primary key,
      //       entry_by_user_id int,
      //       entry_type varchar(50),
      //       app_id varchar(5),
      //       entry_date_time datetime
      //       )
      //     `);
      //     }
      //     const postdata = await dbConnection.query(`
      //     insert into ${dbName}.39_userapp_custom_holidays  (
      //       custom_for_user_category_id,
      //       is_common_holiday_cancelled,
      //       cancelled_common_holiday_id,
      //       new_custom_holiday_name,
      //       new_custom_holiday_date
      //       )
      //       values(
      //       ${mysql.escape(custom_for_user_category_id)},
      //       0,
      //       0,
      //       ${mysql.escape(new_custom_holiday_name)},
      //       ${mysql.escape(new_custom_holiday_date)}
      //       );
      //     `);
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
      //   }
      //   else {
      //     const checkdata = await dbConnection.query(`
      //     select count(*) as count from ${dbName}.39_userapp_custom_holidays
      //     where new_custom_holiday_date = ${mysql.escape(
      //       new_custom_holiday_date,
      //     )} and custom_for_user_category_id = ${mysql.escape(
      //       custom_for_user_category_id,
      //     )};

      //     `);
      //     console.log(checkdata[0].count);

      //     if (checkdata[0].count < 1) {
      //       console.log('ddd');

      //       const postdata = await dbConnection.query(`
      //     insert into ${dbName}.39_userapp_custom_holidays  (
      //       custom_for_user_category_id,
      //       is_common_holiday_cancelled,
      //       cancelled_common_holiday_id,
      //       new_custom_holiday_name,
      //       new_custom_holiday_date
      //       )
      //       values(
      //       ${mysql.escape(custom_for_user_category_id)},
      //       0,
      //       0,
      //       ${mysql.escape(new_custom_holiday_name)},
      //       ${mysql.escape(new_custom_holiday_date)}
      //       );
      //     `);
      //       // aduit trail
      //       const a = await dbConnection.query(`
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
      //       return postdata;
      //     } else {
      //       console.log('sss');
      //     }
      //   }
    } catch (error) {
      throw error;
    }
  }

  async putCustomHolidays(
    country_code,
    customer_id,
    timezone,
    user_id,
    custom_holiday_id,
    new_custom_holiday_date,
    new_custom_holiday_name,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;

      const postdata = await dbConnection.query(`
        UPDATE ${dbName}.39_userapp_custom_holidays
        SET new_custom_holiday_date = ${mysql.escape(
          new_custom_holiday_date,
        )}, new_custom_holiday_name= ${mysql.escape(new_custom_holiday_name)}
        WHERE custom_holiday_id = ${mysql.escape(custom_holiday_id)};       
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
      }
      return postdata;
    } catch (error) {
      throw error;
    }
  }

  async deleteCustomHolidays(
    country_code,
    customer_id,
    timezone,
    user_id,
    custom_holiday_id,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;

      const postdata = await dbConnection.query(`     
        delete from ${dbName}.39_userapp_custom_holidays
        where custom_holiday_id =  ${mysql.escape(custom_holiday_id)};
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

  async postcancelcommonHolidays(
    country_code,
    customer_id,
    timezone,
    user_id,
    custom_for_user_category_id,
    cancelled_common_holiday_id,
  ) {
    try {
      var local = DateTime.local({ zone: timezone });
      var overrideZone = DateTime.fromISO(local, { zone: timezone });
      var requestdate = overrideZone.toString();

      const dbName = `${country_code}_${customer_id}_edu_customer_db`;
      let postdata:any;
      // console.log('ddd');
      if((await this.helper.tableExists(`${country_code}_${customer_id}_edu_customer_db`,`39_userapp_custom_holidays`))==1){
        postdata = await dbConnection.query(`
        insert into ${dbName}.39_userapp_custom_holidays  (	 
          custom_for_user_category_id,
          is_common_holiday_cancelled,
          cancelled_common_holiday_id,
          new_custom_holiday_name,
          new_custom_holiday_date
          )
          values(
          ${mysql.escape(custom_for_user_category_id)},
          1,
          ${mysql.escape(cancelled_common_holiday_id)},
          null,
          null
          );           
        `);
      }else{
        await dbConnection.query(`create table  ${dbName}.39_userapp_custom_holidays(
          custom_holiday_id int primary key auto_increment,
          custom_for_user_category_id varchar(255),
          is_common_holiday_cancelled tinyint(1),
          cancelled_common_holiday_id int,
          new_custom_holiday_name varchar(50),
          new_custom_holiday_date date    
          ) 
        `);
         postdata = await dbConnection.query(`
        insert into ${dbName}.39_userapp_custom_holidays  (	 
          custom_for_user_category_id,
          is_common_holiday_cancelled,
          cancelled_common_holiday_id,
          new_custom_holiday_name,
          new_custom_holiday_date
          )
          values(
          ${mysql.escape(custom_for_user_category_id)},
          1,
          ${mysql.escape(cancelled_common_holiday_id)},
          null,
          null
          );           
        `);
      }
      // const postdata = await dbConnection.query(`
      //   insert into ${dbName}.39_userapp_custom_holidays  (	 
      //     custom_for_user_category_id,
      //     is_common_holiday_cancelled,
      //     cancelled_common_holiday_id,
      //     new_custom_holiday_name,
      //     new_custom_holiday_date
      //     )
      //     values(
      //     ${mysql.escape(custom_for_user_category_id)},
      //     1,
      //     ${mysql.escape(cancelled_common_holiday_id)},
      //     null,
      //     null
      //     );           
      //   `);
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
          'cancelled',
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
          'cancelled',
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
}
