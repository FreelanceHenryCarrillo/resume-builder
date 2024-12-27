import { Global, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ResumeModule } from './Resume/resume.module';
import { UserModule } from './User/user.module';
import { JwtTokenService } from './common/services/token-service-impl';
import { AuthModule } from './Auth/auth.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { FileModule } from './Files/file.module';
import { resolve } from 'path';

const envFilePath = resolve(__dirname, `../environment/.env.${process.env.NODE_ENV || 'development'}`);


@Global() 
@Module({
  imports: [
    ResumeModule,
    UserModule,
    AuthModule,
    FileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [JwtTokenService], 
  exports: [JwtModule, JwtTokenService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'resume', method: RequestMethod.ALL }, 
        { path: 'users/info', method: RequestMethod.GET}, 
        { path: 'file', method: RequestMethod.ALL}, 
      );
  }
}
