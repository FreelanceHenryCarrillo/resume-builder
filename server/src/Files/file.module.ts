import { Module } from '@nestjs/common';
import { SupabaseServiceService } from 'src/common/services/supabase-service.service';
import { FileGetController } from './infrastructure/controller/get/get-file-controller';
import { GetFileUseCase } from './application/use-cases/get/get-file-use-case';
import { FileInterfaceImpl } from './infrastructure/repositories/file-impl';
import { FilePostController } from './infrastructure/controller/post/post-file-controller';
import { PostFileUseCase } from './application/use-cases/post/post-file-use-case';

@Module({
  controllers: [FileGetController, FilePostController],
  providers: [
    SupabaseServiceService,
    FileGetController,
    GetFileUseCase,
    PostFileUseCase,
    { provide: 'FileInterfaceRepository', useClass: FileInterfaceImpl },
  ],
  exports: [GetFileUseCase],
})
export class FileModule {}
