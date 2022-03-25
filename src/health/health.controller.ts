import { Request, Response } from '@libs/core';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { HealthService } from './service';

@Controller('health')
export class HealthController {
    constructor(
        private service:HealthService,
      ) {}
    
      @Get()
      @HealthCheck(

      )
      async check(
          @Req() req:Request,
          @Res() res:Response
      ) {
        return res.success(await this.service.getjobs(req.user,req.all()));
      }
}
