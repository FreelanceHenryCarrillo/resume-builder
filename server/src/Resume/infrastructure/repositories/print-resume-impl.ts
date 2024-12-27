import { Injectable } from '@nestjs/common';
import { SupabaseServiceService } from 'src/common/services/supabase-service.service';
import { PrintResumeEntity } from 'src/Resume/domain/entities/print-resume-entity';
import { PrintResumeRepository } from 'src/Resume/domain/interface/print-resume-interface.interface';

@Injectable()
export class PrintResumeImpl implements PrintResumeRepository {
  constructor(private readonly supabaseService: SupabaseServiceService) {}
  async findResumeById(id: number): Promise<PrintResumeEntity> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('resumeUser')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error('Error fetching resume');
    }

    if (!data) {
      throw new Error('Not Exists Resume');
    }

    return data as PrintResumeEntity;
  }
  async updateResumeById(
    resume: PrintResumeEntity,
    id: number,
  ): Promise<PrintResumeEntity> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('resumeUser')
      .update(resume)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating resume:', error);
      return null;
    }

    return data?.[0] || null;
  }
  downloadResumeById(
    resume: PrintResumeEntity,
    userId: string,
  ): Promise<Buffer[]> {
    return;
  }
  deleteResumeById(userId: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  createResume(resume: PrintResumeEntity): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async findResumeByEmail(email: string): Promise<PrintResumeEntity[]> {
    const findUserId = await this.supabaseService
      .getClient()
      .from('users')
      .select('*')
      .eq('email', email);

    const { data, error } = await this.supabaseService
      .getClient()
      .from('resumeUser')
      .select('*')
      .eq('iduser', findUserId.data[0].id);

    if (error) {
      console.error('Error fetching resumes:', error);
      throw new Error('Error fetching resumes');
    }

    if (!data) {
      return [];
    }

    return data as PrintResumeEntity[];
  }
}
