import { AuthService } from '../services/AuthService';
import { Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { ApiController, Request, Response } from '@libs/core';
import { UserDetailTransformer } from '../../user/transformer';

@Controller('auth')
export class AuthController extends ApiController {
  constructor(private service: AuthService) {
    super();
  }

  @Post('signup')
  async register(@Req() req: Request, @Res() res: Response) {
    const user = await this.service.register(req.all());
    return res.success(
      await this.transform(user, new UserDetailTransformer(), { req }),
    );
  }

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const user = await this.service.login(req.all());
    return res.success(
      await this.transform(user, new UserDetailTransformer(), { req }),
    );
  }

  @Post('admin/login')
  async adminLogin(@Req() req: Request, @Res() res: Response) {
    const user = await this.service.adminlogin(req.all());
    return res.success(
      await this.transform(user, new UserDetailTransformer(), { req }),
    );
  }

  // @Post('forget-password')
  // async forgetPassword(@Req() req:Request,@Res() res:Response){
  //     const message = await this.service.forgetpassword(req.all());
  //     return res.success({
  //         message:message
  //     }

  //     );
  // }

  // @Put('reset-password')
  // async resetPassword(@Req() req:Request,@Res() res:Response){
  //     const user = await this.service.newPass(req.all());
  //     return res.success(
  //         await this.transform(user,new UserDetailTransformer(),{req})
  //     );
  // }
}
