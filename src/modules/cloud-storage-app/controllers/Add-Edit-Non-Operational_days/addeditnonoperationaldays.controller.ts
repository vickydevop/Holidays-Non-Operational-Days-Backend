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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import ResponseInterface from 'src/models/interface/response.interface';
import { AuthService } from 'src/auth/services/auth.service';
import { AddEditNonOperationaldaysService } from '../../services/Add-Edit-Non-Operational_days/addeditnonoperationaldays.service';
import { Request } from 'express';

@Controller()
export class AddEditNonOperationaldaysController {
  constructor(
    private api: AddEditNonOperationaldaysService,
    private _authService: AuthService,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Non-Operational-Days')
  @Get('get-non-operational-days')
  async getNonOperationalDays(
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

      const data = await this.api.getNonOperationalDays(
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
  @ApiTags('Add-Edit-Non-Operational-Days')
  @Post('post-non-operational-days')
  async postNonOperationalDays(
    // @Query("common_holiday_id") common_holiday_id: number,
    @Query('common_non_operational_day_date')
    common_non_operational_day_date: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.postNonOperationalDays(
        country_code,
        customer_id,
        timezone,
        user_id,
        // common_holiday_id,
        common_non_operational_day_date,

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
  @ApiTags('Add-Edit-Non-Operational-Days')
  @Delete('delete-non-operational-days')
  async deleteNonOperationalDays(
    @Query('common_non_operational_day_date')
    common_non_operational_day_date: string,
    // @Query("common_holiday_name") common_holiday_name: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.deleteNonOperationalDays(
        country_code,
        customer_id,
        timezone,
        user_id,
        common_non_operational_day_date,

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

  // *-----------------Custom Holidays-----------------------*//

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Add-Edit-Custom-Non-Operational-Days')
  @Get('get-custom-non-operational-days')
  async getCustomNonOperationalDays(
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

      const data = await this.api.getCustomNonOperationalDays(
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
  @ApiTags('Add-Edit-Custom-Non-Operational-Days')
  @Post('post-custom-non-operational-days')
  async postCustomNonOperationalDays(
    @Query('custom_for_user_category_id') custom_for_user_category_id: string,
    @Query('new_custom_non_operational_day_date')
    new_custom_non_operational_day_date: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.postCustomNonOperationalDays(
        country_code,
        customer_id,
        timezone,
        user_id,
        custom_for_user_category_id,
        new_custom_non_operational_day_date,

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
  @ApiTags('Add-Edit-Custom-Non-Operational-Days')
  @Put('put-custom-non-operational-days')
  async putCustomNonOperationalDays(
    @Query('custom_non_operational_day_id')
    custom_non_operational_day_id: number,
    @Query('new_custom_non_operational_day_date')
    new_custom_non_operational_day_date: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.putCustomNonOperationalDays(
        country_code,
        customer_id,
        timezone,
        user_id,
        custom_non_operational_day_id,
        new_custom_non_operational_day_date,

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
  @ApiTags('Add-Edit-Custom-Non-Operational-Days')
  @Delete('delete-custom-non-operational-days')
  async deleteCustomNonOperationalDays(
    @Query('custom_non_operational_day_id')
    custom_non_operational_day_id: number,
    // @Query("common_holiday_name") common_holiday_name: string,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.deleteCustomNonOperationalDays(
        country_code,
        customer_id,
        timezone,
        user_id,
        custom_non_operational_day_id,

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
  @ApiTags('Cancel-Non-Operational-Days')
  @Post('post-cancel-non-operational-days')
  async postCancelNonOperationalDays(
    @Query('custom_for_user_category_id') custom_for_user_category_id: string,
    @Query('cancelled_common_non_operational_day_id')
    cancelled_common_non_operational_day_id: number,

    @Req() req: Request,
  ): Promise<ResponseInterface> {
    try {
      const token = String(req.headers.authorization).replace('Bearer ', '');
      const _data = await this._authService
        .verifyJwt(token)
        .then((data) => data.user);
      const { customer_id, country_code, timezone, user_id } = _data;

      const data = await this.api.postCancelNonOperationalDays(
        country_code,
        customer_id,
        timezone,
        user_id,
        custom_for_user_category_id,
        cancelled_common_non_operational_day_id,

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

  // *-----------------aduit trail-----------------------*//

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiTags('aduit-trail')
  @Get('get-aduit-trail')
  async getaduittrail(
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

      const data = await this.api.getaduittrail(
        country_code,
        customer_id,
        timezone,
        user_id,
        // custom_for_user_category_id
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
  
}
