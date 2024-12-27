import {
  Controller,
  Post,
  Body,
  UsePipes,
  BadRequestException,
  InternalServerErrorException,
  Logger,
  Param,
  Get,
  Query,
  Req,
  Put,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation-pipe';
import {
  getResumeDto,
  getResumeSchema,
  PrintResumeDto,
  PrintResumeSchema,
} from '../dtos/print-resume-dto';
import { PrintResumeUseCase } from 'src/Resume/application/use-cases/print-resume-/print-resume-use-case';
import { PrintResumeEntity } from 'src/Resume/domain/entities/print-resume-entity';
import { GetResumeUseCase } from 'src/Resume/application/use-cases/print-resume-/get-resume-use-case';
import { UpdateResumeUseCase } from 'src/Resume/application/use-cases/print-resume-/update-resume-use-case';

@Controller('resume')
export class ResumeController {
  constructor(
    private readonly printResumeUseCase: PrintResumeUseCase,
    private readonly getResumeUseCase: GetResumeUseCase,
    private readonly updateResumeUseCase: UpdateResumeUseCase,
  ) {}

  @Post('download')
  @UsePipes(new ZodValidationPipe(PrintResumeSchema))
  async donwloadResume(@Body() printResume: PrintResumeDto) {
    try {
      const resume = await this.printResumeUseCase.donwloadResume(
        printResume as PrintResumeEntity,
        'asdasd',
      );
      return resume;
    } catch (error) {
      Logger.error('Error creating user:', error);

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error);
      } else {
        throw new InternalServerErrorException('Error al crear el usuario.');
      }
    }
  }

  @Get()
  async getResumes(@Req() req) {
    try {
      const { email } = req.user;
      return await this.printResumeUseCase.getResume(email);
    } catch (error) {
      Logger.error('Error creating user:', error);

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error);
      } else {
        throw new InternalServerErrorException('Error al crear el usuario.');
      }
    }
  }

  @Get(':id')
  async getResume(@Param() { id }) {
    try {
      return await this.getResumeUseCase.getResumebyId(id);
    } catch (error) {
      Logger.error('Error creating user:', error);

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error);
      } else {
        throw new InternalServerErrorException('Error al crear el usuario.');
      }
    }
  }

  @Put(':id')
  async update(@Param() { id }, @Body() data: PrintResumeDto) {
    try {
      return await this.updateResumeUseCase.updateResumebyId(id, data);
    } catch (error) {
      Logger.error('Error creating user:', error);

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error);
      } else {
        throw new InternalServerErrorException('Error al crear el usuario.');
      }
    }
  }
}
