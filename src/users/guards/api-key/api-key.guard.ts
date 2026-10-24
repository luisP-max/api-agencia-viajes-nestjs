import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
  
    // extrae el encabezado x-apy-key de la peticion HTTP
    const apiKey = request.headers['x-api-key']

    if (!apiKey) {
      throw new UnauthorizedException('La cabecera x-api-key es obligatoria para acceder a la API.');
    }

    // obtener las llaves permitidas del archivo .env y convertirlas en un arreglo 
    const allowedApiKeysString = this.configService.get<string>('API_KEYS') || '';
    const allowedApiKeys = allowedApiKeysString.split(',').map(key => key.trim());

    // valida si el API key enviado por el cliente si es correcto
    const isValid = allowedApiKeys.includes(apiKey);
    if (!isValid) {
      throw new UnauthorizedException('El API key proporcionado no es valido o ha expirado.');
    }
    
    return true;
  }
}