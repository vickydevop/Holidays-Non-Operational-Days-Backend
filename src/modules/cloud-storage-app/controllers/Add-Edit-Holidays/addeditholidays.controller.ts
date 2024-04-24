/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddEditHolidaysService } from '../../services/Add-Edit-Holidays/addeditholidays.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import ResponseInterface from 'src/models/interface/response.interface';

// import { SyllabusId } from 'src/dto/syllabusid.dto';
import { Request } from 'express';
import { AuthService } from 'src/auth/services/auth.service';

@Controller()
export class AddEditHolidaysController {
  constructor(
    private api: AddEditHolidaysService,
    private _authService: AuthService,
  ) {}

  @Get('get-token-gen')
  async getTOkenGen(
    //   @Query('customer_id') customer_id: number,
    //   @Query('country_code') country_code: string,
    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const payload = {
        user_id: 1,
        customer_id: 11,
        country_code: 'in',
        customer_sub_domain_name: 'test',
        registered_educational_institution_name: 'Test Institution',
        time_zone_iana_string: 'Asia/Kolkata',
        socket_id: '',
        educational_institution_category_id: 'RLL55SpwKoJhgtH,mcQUnDH0BdFJt74',
        user_registered_categories_ids: '70NWnS7CuatHklp',
        user_registration_login_approval_status: 1,
        country: 'IN',
        pin_code: '635109',
        state_province: 'Tamil Nadu',
        city_district_county: 'Hosur',
        address_line_1: 'kurumbar street',
        address_line_2: 'kandhikuppam post',
      };
      const token = await this._authService.generateJwt(payload);
      // console.log("token", token);

      return {
        statusCode: 200,
        message: 'get data Successfully !!',
        data: token,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Common-Holidays')
  @Get('get-common-holidays-count')
  async getCommonHolidayscount(
    // @Query('page_no') page_no: number,
    // @Query("per_page") per_page: number,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.getCommonHolidayscount(
        country_code,
        customer_id,
        user_id,
        // page_no,per_page
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Common-Holidays')
  @Get('get-common-holidays')
  async getCommonHolidays(
    @Query('page_no') page_no: number,
    @Query('per_page') per_page: number,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.getCommonHolidays(
        country_code,
        customer_id,
        user_id,
        page_no,
        per_page,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Common-Holidays')
  @Post('post-common-holidays')
  async postCommonHolidays(
    // @Query("common_holiday_id") common_holiday_id: number,
    @Query('common_holiday_date') common_holiday_date: string,
    @Query('common_holiday_name') common_holiday_name: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.postCommonHolidays(
        country_code,
        customer_id,
        timezone,
        user_id,
        // common_holiday_id,
        common_holiday_date,
        common_holiday_name,

        // user_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Common-Holidays')
  @Put('put-common-holidays')
  async putCommonHolidays(
    @Query('common_holiday_id') common_holiday_id: number,
    @Query('common_holiday_date') common_holiday_date: string,
    @Query('common_holiday_name') common_holiday_name: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.putCommonHolidays(
        country_code,
        customer_id,
        timezone,
        user_id,
        common_holiday_id,
        common_holiday_date,
        common_holiday_name,

        // user_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Common-Holidays')
  @Delete('delete-common-holidays')
  async deleteCommonHolidays(
    @Query('common_holiday_id') common_holiday_id: number,
    // @Query("common_holiday_name") common_holiday_name: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.deleteCommonHolidays(
        country_code,
        customer_id,
        timezone,
        user_id,
        common_holiday_id,

        // user_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  // *-----------------Get All Student Categories-----------------------*//
  @ApiTags('Add-Edit-Common-Holidays -Get-Tree-Data')
  @ApiBearerAuth('JWT-auth')
  @Get('2_userapp_user_category/get-all-student-categories-by-customer-id')
  async getInstitutionalCourses(
    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { USER_ID, customer_id, country_code } = _data;

      const data = await this.api.getAllStudentCategories(
        customer_id,
        country_code,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Get Successfully',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  // *-----------------------------Get Category Full Name---------------------*//
  @ApiTags('Add-Edit-Common-Holidays -Get-Tree-Data')
  @ApiBearerAuth('JWT-auth')
  @Get('2_userapp_user_category/get-category-full-name-by-user-category-id')
  async getCategoryFullName(
    @Query('USER_CATEGORY_ID') userCategoryId: string,
    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { USER_ID, customer_id, country_code } = _data;

      const data = await this.api.getCategoryFullName(
        customer_id,
        country_code,
        userCategoryId,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Get Successfully',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  // *-----------------Custom Holidays-----------------------*//

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Custom-Holidays')
  @Get('get-custom-holidays')
  async getCustomHolidays(
    @Query('custom_for_user_category_id') custom_for_user_category_id: string,
    // @Query("per_page") per_page: number,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.getCustomHolidays(
        country_code,
        customer_id,
        user_id,
        custom_for_user_category_id,
        // page_no,per_page
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Custom-Holidays')
  @Post('post-Custom-holidays')
  async postCustomHolidays(
    @Query('custom_for_user_category_id') custom_for_user_category_id: string,
    @Query('new_custom_holiday_date') new_custom_holiday_date: string,
    @Query('new_custom_holiday_name') new_custom_holiday_name: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.postCustomHolidays(
        country_code,
        customer_id,
        timezone,
        user_id,
        custom_for_user_category_id,
        new_custom_holiday_date,
        new_custom_holiday_name,

        // user_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Custom-Holidays')
  @Put('put-custom-holidays')
  async putCustomHolidays(
    @Query('custom_holiday_id') custom_holiday_id: number,
    @Query('new_custom_holiday_date') new_custom_holiday_date: string,
    @Query('new_custom_holiday_name') new_custom_holiday_name: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.putCustomHolidays(
        country_code,
        customer_id,
        timezone,
        user_id,
        custom_holiday_id,
        new_custom_holiday_date,
        new_custom_holiday_name,

        // user_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Custom-Holidays')
  @Delete('delete-custom-holidays')
  async deleteCustomHolidays(
    @Query('custom_holiday_id') custom_holiday_id: number,
    // @Query("common_holiday_name") common_holiday_name: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.deleteCustomHolidays(
        country_code,
        customer_id,
        timezone,
        user_id,
        custom_holiday_id,

        // user_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Cancel-Common-Holidays')
  @Post('post-cancel-common-holidays')
  async postcancelcommonHolidays(
    @Query('custom_for_user_category_id') custom_for_user_category_id: string,
    @Query('cancelled_common_holiday_id') cancelled_common_holiday_id: number,
    // @Query("new_custom_holiday_name") new_custom_holiday_name: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.postcancelcommonHolidays(
        country_code,
        customer_id,
        timezone,
        user_id,
        custom_for_user_category_id,
        cancelled_common_holiday_id,

        // user_id,
      );

      return {
        statusCode: 200,
        message: 'Get data successful',
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
