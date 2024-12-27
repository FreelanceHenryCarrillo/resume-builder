import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation-pipe';
import { GetFileUseCase } from 'src/Files/application/use-cases/get/get-file-use-case';
import { FileSchema } from '../../dtos/file-dto';
import { PostFileUseCase } from 'src/Files/application/use-cases/post/post-file-use-case';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FilePostController {
  constructor(private postFileUseCase: PostFileUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) 
  /* @UsePipes(new ZodValidationPipe(FileSchema)) */
  async postFile(@UploadedFile() file,@Body() {bucketName, idUser}) {

    try {
      return await this.postFileUseCase.postFileId(file, bucketName, idUser);
    } catch (error) {
      Logger.error('Error creating user:', error);

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error);
      } else {
        throw new InternalServerErrorException('Error al introducir una imagen');
      }
    }
  }
}
