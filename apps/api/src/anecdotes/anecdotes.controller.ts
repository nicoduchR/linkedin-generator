import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AnecdotesService } from './anecdotes.service';
import { CreateAnecdoteDto, UpdateAnecdoteDto } from './dto/anecdotes.dto';
import { Anecdote } from './entities/anecdote.entity';

@Controller('anecdotes')
export class AnecdotesController {
  constructor(private readonly anecdotesService: AnecdotesService) {}

  @Get()
  async findAll(): Promise<Anecdote[]> {
    return this.anecdotesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Anecdote> {
    return this.anecdotesService.findOne(id);
  }

  @Post()
  async create(
    @Body() createAnecdoteDto: CreateAnecdoteDto,
  ): Promise<Anecdote> {
    return this.anecdotesService.create(createAnecdoteDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAnecdoteDto: UpdateAnecdoteDto,
  ): Promise<Anecdote> {
    return this.anecdotesService.update(id, updateAnecdoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.anecdotesService.remove(id);
  }
}
