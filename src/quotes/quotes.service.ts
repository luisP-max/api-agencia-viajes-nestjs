import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity.js';
import { Repository } from 'typeorm';
import { UpdateQuoteDto } from './dto/update-quote.dto.js';

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
    order: { createdAt: 'DESC' }
  });
  }

  async findOne(id: string, user:any): Promise<Quote> {
    const quote = await this.quoteRepository.findOne({ where: { id } });
    if (!quote) {
      throw new NotFoundException(`La cotización con ID ${id} no existe.`);
    }

    if (user.rol === 'asesor' && quote.createdBy !== user.username) {
      throw new ForbiddenException('No tienes permiso para ver esta cotización.');
    }

    return quote;
  }

  async update(id: string, updateQuoteDto: UpdateQuoteDto, user: any): Promise<Quote> {
    const quote = await this.findOne(id, user);

    if (user.rol !== 'asesor' || quote.createdBy !== user.username) {
      throw new ForbiddenException('Solo el asesor propietario puede modificar esta cotización.');
    }

    const updateQuote = this.quoteRepository.merge(quote, updateQuoteDto);
    return await this.quoteRepository.save(updateQuote);
  }

  async remove(id: string, user: any): Promise<{ message: string }> {
    const quote = await this.findOne(id, user);

    if (user.rol !== 'admin') {
      throw new ForbiddenException ('Solo los usuarios con rol administrativo pueden eliminar cotizaciones.');
    }

    await this.quoteRepository.remove(quote);
    return { message: `Cotización con ID ${id} eliminada correctamente.` };
  }
}
