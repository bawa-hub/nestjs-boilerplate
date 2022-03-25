import { JwtAuthGuard } from '@app/auth/guards';
import { ApplicationsTransformer } from '@app/applications/transformer';
import { ApiController, Request,Response } from '@libs/core';
import { Controller, Get, Query, Res, UseGuards, Req } from '@nestjs/common';
import { ApplicationService } from '../services';
import { RolesGuard } from '@app/_support/guards';
import { Roles } from '@app/_support/decorators';
import { Role } from '@app/_support/enums';

@Controller('applications')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.Admin)
export class ApplicationsController extends ApiController{
    constructor(private service:ApplicationService){
        super()
    }

    @Get()
    async getapplications(
        @Req() req:Request,
        @Res() res:Response
    ){
        const applications = await this.service.getapplications(req.all())
        return res.withMeta(
            await this.paginate(applications,new ApplicationsTransformer(),{req})
        )
    }
    
}
