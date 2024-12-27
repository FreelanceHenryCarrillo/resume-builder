import { Module } from '@nestjs/common';
import { ResumeController } from './infrastructure/controller/resume-controller';
import { PrintResumeImpl } from './infrastructure/repositories/print-resume-impl';
import { PrintResumeUseCase } from './application/use-cases/print-resume-/print-resume-use-case';
import { SupabaseServiceService } from 'src/common/services/supabase-service.service';
import { GetResumeUseCase } from './application/use-cases/print-resume-/get-resume-use-case';
import { UpdateResumeUseCase } from './application/use-cases/print-resume-/update-resume-use-case';

@Module({
  controllers: [ResumeController],
  providers: [
    SupabaseServiceService,
    PrintResumeUseCase,
    GetResumeUseCase,
    UpdateResumeUseCase,
    { provide: 'PrintResumeRepository', useClass: PrintResumeImpl },
  ],
  exports: [PrintResumeUseCase], 
})
export class ResumeModule {}