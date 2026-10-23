import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users.service.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService //inyectamos el servicio en memoria
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const requierdRoles = this.reflector.get<string[]>('roles', context.getHandler)
    if (!requierdRoles) {
      return true; //si el endpoint no tiene roles especificos definidos, se permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const username = request.headers['x-user'];

    if (!username) {
      throw new UnauthorizedException('la cabecera de seguridad x-user es obligatoria.');
    }

    const user = this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException(`El usuario "${username}" no está registrado en el sistema.`);
    }

    request.user = user;

    const hasRole = requierdRoles.includes(user.rol);
    if (!hasRole) {
      throw new ForbiddenException(`Tu rol de "${user.rol}" no tiene permisos para realizar esta acción.`);
    }

    return true;
  }
}