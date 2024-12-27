import { Inject, Injectable } from '@nestjs/common';
import { FileInterfaceRepository, IUrl } from 'src/Files/domain/interface/file-interface';

@Injectable()
export class GetFileUseCase {
  constructor(
    @Inject('FileInterfaceRepository')
    private fileInterface: FileInterfaceRepository,
  ) {}

  async getResumebyId(userId: number): Promise<IUrl> {
    return this.fileInterface.findOneFileById(userId);
  }
}
