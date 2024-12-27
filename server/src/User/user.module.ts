import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { CreateUserUseCase } from './application/use-cases/create-user-use-case';
import { LoginUserUseCase } from './application/use-cases/login-user-use-case';
import { SupabaseServiceService } from '../common/services/supabase-service.service'; // Importar el servicio compartido
import { UserSupabaseRepository } from './infrastructure/repositories/resume-repository-impl';
import { GetInfoUserUseCase } from './application/use-cases/get-user-info-use-case';

@Module({
  controllers: [UserController],
  providers: [
    SupabaseServiceService,
    CreateUserUseCase,
    LoginUserUseCase,
    GetInfoUserUseCase,
    { provide: 'UserRepository', useClass: UserSupabaseRepository },
  ],
  exports: [CreateUserUseCase, LoginUserUseCase], 
})
export class UserModule {}
