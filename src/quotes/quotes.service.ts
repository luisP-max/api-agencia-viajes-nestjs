import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class QuotesService {
  constructor(
    // inyecte el repositorio fisico de la tabla en postgreSQL
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
  ) {}

  // metodo seguro para crear una cotizacion asignandole su creador real
  async create(CreateQuoteDto: CreateQuoteDto, username: string): Promise <Quote> {
    const newQuote = this.quoteRepository.create({
      ...CreateQuoteDto,
      createdBy: username,
    });

    return await this.quoteRepository.save(newQuote);
  }

  // Actualizamos el método findAll para recibir el objeto usuario inyectado por el Guard
  async findAll(user: any): Promise<Quote[]> {
    if (user.rol === 'asesor') {
      return await this.quoteRepository.find({
        where: { createdBy: user.username },
        order: { createdAt: 'DESC' },
      });
    }
  
  return await this.quoteRepository.find({
    order: { createdAt: 'DESC' },
  });
}
}
