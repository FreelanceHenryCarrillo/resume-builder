import { Inject, Injectable } from '@nestjs/common';
import { PrintResumeEntity } from 'src/Resume/domain/entities/print-resume-entity';
import { PrintResumeRepository } from 'src/Resume/domain/interface/print-resume-interface.interface';

@Injectable()
export class UpdateResumeUseCase {
  constructor(
    @Inject('PrintResumeRepository') private printResume: PrintResumeRepository,
  ) {}

  async updateResumebyId(id: number, data: PrintResumeEntity): Promise<PrintResumeEntity> {
   
     return this.printResume.updateResumeById( data ,id)
  }
}
