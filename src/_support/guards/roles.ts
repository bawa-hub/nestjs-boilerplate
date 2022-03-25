import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles';
import { Role } from '../enums/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('requiredRoles', requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user.type', requiredRoles.includes(user.type));

    return requiredRoles.includes(user.type);
  }
}
