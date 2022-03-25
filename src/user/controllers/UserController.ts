import { ApiController, Request, Response } from '@libs/core';
import {
  Controller,
  Delete,
  Get,
  Put,
  Req,
  Res,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UserService } from '../services';
import { UserDetailTransformer } from '../transformer';
import { JwtAuthGuard } from '@app/auth/guards';
import { RolesGuard } from '@app/_support/guards';
import { Roles } from '@app/_support/decorators';
import { Role } from '@app/_support/enums';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController extends ApiController {
  constructor(private users: UserService) {
    super();
  }

  @Get()
  @Roles(Role.Admin)
  async getusers(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const users = await this.users.getusers(req.all());
    return res.withMeta(
      await this.paginate(users, new UserDetailTransformer(), { req }),
    );
  }

  @Get('/my-profile')
  async getProfile(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.users.find(req.user);
    return res.success(
      await this.transform(user, new UserDetailTransformer(), { req }),
    );
  }

  @Get('/:id')
  @Roles(Role.Admin)
  async getuser(@Req() req: Request, @Res() res: Response) {
    const user = await this.users.get(req.all());
    return res.success(await this.transform(user, new UserDetailTransformer()));
  }

  @Put('/my-profile')
  async update(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const user = await this.users.updateprofile(req.user, req.all());
    return res.success(await this.transform(user, new UserDetailTransformer()));
  }

  @Put('/:id')
  @Roles(Role.Admin)
  async updateuser(@Req() req: Request, @Res() res: Response) {
    const user = await this.users.updateuser(req.all());
    return res.success(await this.transform(user, new UserDetailTransformer()));
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  async deleteuser(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    await this.users.deleteuser(req.all());
    return res.success({ Deleted: true });
  }
}
