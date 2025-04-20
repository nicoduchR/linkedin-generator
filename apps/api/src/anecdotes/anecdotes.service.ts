import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnecdoteDto, UpdateAnecdoteDto } from './dto/anecdotes.dto';
import { Anecdote } from './entities/anecdote.entity';

@Injectable()
export class AnecdotesService {
  constructor(
    @InjectRepository(Anecdote)
    private anecdotesRepository: Repository<Anecdote>,
  ) {}

  async findAll(): Promise<Anecdote[]> {
    return this.anecdotesRepository.find();
  }

  async findOne(id: string): Promise<Anecdote> {
    const anecdote = await this.anecdotesRepository.findOne({ where: { id } });
    if (!anecdote) {
      throw new NotFoundException(`Anecdote with ID ${id} not found`);
    }
    return anecdote;
  }

  async create(createAnecdoteDto: CreateAnecdoteDto): Promise<Anecdote> {
    const newAnecdote = this.anecdotesRepository.create({
      ...createAnecdoteDto,
      date: new Date().toISOString(),
    });

    return this.anecdotesRepository.save(newAnecdote);
  }

  async update(
    id: string,
    updateAnecdoteDto: UpdateAnecdoteDto,
  ): Promise<Anecdote> {
    const anecdote = await this.findOne(id);

    const updatedAnecdote = {
      ...anecdote,
      ...updateAnecdoteDto,
    };

    return this.anecdotesRepository.save(updatedAnecdote);
  }

  async remove(id: string): Promise<void> {
    const result = await this.anecdotesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Anecdote with ID ${id} not found`);
    }
  }
}
