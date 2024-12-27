import { PrintResumeEntity } from '../entities/print-resume-entity';

export interface PrintResumeRepository {
  updateResumeById(
    resume: PrintResumeEntity,
    id: number,
  ): Promise<PrintResumeEntity>;
  downloadResumeById(
    resume: PrintResumeEntity,
    userId: string,
  ): Promise<Buffer[]>;
  deleteResumeById(userId: string): Promise<string>;
  createResume(resume: PrintResumeEntity): Promise<string>;
  findResumeByEmail(userId: string): Promise<PrintResumeEntity[]>;
  findResumeById(id: number): Promise<PrintResumeEntity>;
}
