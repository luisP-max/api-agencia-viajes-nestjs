import { Controller, Post, Body, Headers, BadRequestException } from "@nestjs/common";
import { QuotesService } from "./quotes.service.js";
import { CreateQuoteDto } from "./dto/create-quote.dto.js";

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  async create(
    @Body() CreateQuoteDto: CreateQuoteDto,
    @Headers('x-user') xUser: string,
  ) {
    // validacion temporal para asegurar que envie el usuario
    if (!xUser) {
      throw new BadRequestException(' la cabeza de seguridad x-user es obligatorio')
    }

    return this.quotesService.create(CreateQuoteDto, xUser);
  }
}
