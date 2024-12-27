import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { SupabaseServiceService } from 'src/common/services/supabase-service.service';
import { LoginAuthUseCase } from './application/login-use-case';
import { AuthRepository } from './infrastructure/repositories/resume-repository-impl';

@Module({
  controllers: [AuthController],
  providers: [
    SupabaseServiceService,
    LoginAuthUseCase,
    { provide: 'AuthRepository', useClass: AuthRepository },
  ],
  exports: [LoginAuthUseCase],
})
export class AuthModule {}
