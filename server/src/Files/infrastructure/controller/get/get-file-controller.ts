import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation-pipe';
import { GetFileUseCase } from 'src/Files/application/use-cases/get/get-file-use-case';
import { GetFileSchema } from '../../dtos/file-dto';

@Controller('file')
export class FileGetController {
  constructor(private getFileUseCase: GetFileUseCase) {}

  @Get()
  @UsePipes(new ZodValidationPipe(GetFileSchema))
  async getFileById(@Query() { userId }) {
    try {
      return await this.getFileUseCase.getResumebyId(userId);
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
