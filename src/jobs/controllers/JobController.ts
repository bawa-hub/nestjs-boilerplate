import { JwtAuthGuard } from '@app/auth/guards';
import { ApiController, Request, Response } from '@libs/core';
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from '../services';
import { JobsTransformer } from '../transformer';
import { ApplicationsTransformer } from '@app/applications/transformer';
import { Roles } from '../../_support/decorators';
import { Role } from '../../_support/enums';
import { RolesGuard } from '../../_support/guards';

@Controller('jobs')
export class JobsController extends ApiController {
  constructor(private service: JobsService) {
    super();
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async get(@Req() req: Request, @Res() res: Response) {
    const jobs = await this.service.get(req.user, req.all());
    console.log(jobs);
    return res.withMeta(
      await this.paginate(jobs, new JobsTransformer(), { req }),
    );
  }

  @Get('/applied')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Candidate)
  async getappliedjobs(@Req() req: Request, @Res() res: Response) {
    const jobs = await this.service.getappliedjobs(req.user, req.all());
    return res.withMeta(
      await this.paginate(jobs, new ApplicationsTransformer(), { req }),
    );
  }

  @Get('/:id/applications')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Recruiter, Role.Admin)
  async getapplications(@Req() req: Request, @Res() res: Response) {
    const applications = await this.service.getapplications(
      req.all(),
      req.user,
    );
    return res.withMeta(
      await this.paginate(applications, new ApplicationsTransformer(), { req }),
    );
  }

  @Get('/:id')
  async getjob(@Req() req: Request, @Res() res: Response) {
    const job = await this.service.getjob(req.all());
    return res.success(
      await this.transform(job, new JobsTransformer(), { req }),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard) // Checks for the permission.
  @Roles(Role.Recruiter)
  async addjob(@Req() req: Request, @Res() res: Response) {
    const job = await this.service.addjob(req.user, req.all());
    return res.success(
      await this.transform(job, new JobsTransformer(), { req }),
    );
  }

  @Post('/:id/apply')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Candidate)
  async postapplication(@Req() req: Request, @Res() res: Response) {
    const message = await this.service.postapplication(req.all(), req.user);
    return res.success({
      message: message,
    });
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Recruiter)
  async updatejob(@Req() req: Request, @Res() res: Response) {
    const job = await this.service.updatejob(req.user, req.all());
    return res.success(
      await this.transform(job, new JobsTransformer(), { req }),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Recruiter)
  async deletejob(@Req() req: Request, @Res() res: Response) {
    await this.service.deletejob(req.all(), req.user);
    return res.success({ message: 'Job is deleted.' });
  }
}
