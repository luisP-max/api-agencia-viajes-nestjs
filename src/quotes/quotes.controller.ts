import { Controller, Post, Body, Headers, BadRequestException, UseGuards, Get, Req, Patch, Param, Delete } from "@nestjs/common";
import { QuotesService } from "./quotes.service.js";
import { CreateQuoteDto } from "./dto/create-quote.dto.js";
import { RolesGuard } from "../users/guards/roles/roles.guard.js"; //aqui importe los guards de los roles
import { Roles } from "../users/roles.decorator.js"; //aqui importe el decorador 
import { UpdateQuoteDto } from "./dto/update-quote.dto.js";

@Controller('quotes')
@UseGuards(RolesGuard) // protege todas las rutas de este controlador
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @Roles('asesor') // aplica la regla estricta de que SOLO el asesor puede crear 
  async create(
    @Body() CreateQuoteDto: CreateQuoteDto,
    @Headers('x-user') xUser: string,
  ) {
    // validacion temporal para asegurar que envie el usuario
    if (!xUser) {
      throw new BadRequestException(' la cabeza de seguridad x-user es obligatorio');
    }
    return this.quotesService.create(CreateQuoteDto, xUser);
  }

  @Get()
  @Roles('admin', 'gerente', 'asesor') // entre estos tres pueden consultar, pero el Guard aplicara el registro interno
  async findAll(@Req() request:any) {
    return this.quotesService.findAll(request.user);
  }

  @Get(':id')
  @Roles('admin', 'gerente', 'asesor')
  async findOne (@Param('id') id: string, @Req() request:any) {
    return this.quotesService.findOne(id, request.user);
  }

  @Patch(':id')
  @Roles('asesor')
  async update (@Param('id') id: string, @Body() UpdateQuoteDto: UpdateQuoteDto, @Req() request:any) {
    return this.quotesService.update(id, UpdateQuoteDto, request.user);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string, @Req() request: any) {
    return this.quotesService.remove(id, request.user);
  }
}
