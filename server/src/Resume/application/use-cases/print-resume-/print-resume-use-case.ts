import { Inject, Injectable } from '@nestjs/common';
import { PrintResumeEntity } from 'src/Resume/domain/entities/print-resume-entity';
import { PrintResumeRepository } from 'src/Resume/domain/interface/print-resume-interface.interface';

@Injectable()
export class PrintResumeUseCase {
  constructor(
    @Inject('PrintResumeRepository') private printResume: PrintResumeRepository,
  ) {}

  async donwloadResume(
    resume: PrintResumeEntity,
    userId: string,
  ): Promise<Buffer[]> {
    return this.printResume.downloadResumeById(resume, userId);
  }

  async getResume(email: string): Promise<PrintResumeEntity[]> {
    return this.printResume.findResumeByEmail(email);
  }
}
