import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseServiceService {

  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_PUBLIC_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Key are required');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }
    getClient() {
      return this.supabase;
    }
}
