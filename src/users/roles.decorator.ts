import { SetMetadata } from "@nestjs/common";

// Este decorador guardará en los metadatos de NestJS la lista de roles autorizados
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);