import { Inject, Injectable } from '@nestjs/common';
import { FileEntity } from 'src/Files/domain/entities/file-entity';
import { FileInterfaceRepository, IUrl } from 'src/Files/domain/interface/file-interface';

@Injectable()
export class PostFileUseCase {
  constructor(
    @Inject('FileInterfaceRepository')
    private fileInterface: FileInterfaceRepository,
  ) {}

  async postFileId(
    file: FileEntity,
    bucketName: string,
    userId: number,
  ): Promise<IUrl> {
    return this.fileInterface.postFile(file, bucketName, userId);
  }
}
