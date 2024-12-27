import { FileEntity } from '../entities/file-entity';

export interface IUrl {
  url: string
}

export interface FileInterfaceRepository {
  findOneFileById(id: number): Promise<IUrl>;
  postFile(
    file: FileEntity,
    bucketName: string,
    userId: number,
  ): Promise<IUrl>;
}
