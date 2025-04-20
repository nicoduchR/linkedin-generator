import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnecdotesController } from './anecdotes.controller';
import { AnecdotesService } from './anecdotes.service';
import { Anecdote } from './entities/anecdote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anecdote])],
  controllers: [AnecdotesController],
  providers: [AnecdotesService],
  exports: [AnecdotesService],
})
export class AnecdotesModule {}
