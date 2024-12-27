import { Inject, Injectable } from '@nestjs/common';
import { PrintResumeEntity } from 'src/Resume/domain/entities/print-resume-entity';
import { PrintResumeRepository } from 'src/Resume/domain/interface/print-resume-interface.interface';

@Injectable()
export class GetResumeUseCase {
  constructor(
    @Inject('PrintResumeRepository') private printResume: PrintResumeRepository,
  ) {}



  async getResumebyId(id: number): Promise<PrintResumeEntity> {
    return this.printResume.findResumeById(id);
  }
}
