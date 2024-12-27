import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user-dto';
import { LoginAuthUseCase } from 'src/Auth/application/login-use-case';
import { RegisterUserDto } from '../dto/register-dto';
import { UserEntity } from 'src/User/domain/entities/user-entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginAuthUseCase: LoginAuthUseCase) {}

  @Post('login')
  async login(@Body() { email, password }: LoginUserDto ): Promise<string> {
    try { 
      const token = await this.loginAuthUseCase.execute(email, password);

      return token
    } catch (error) {
      Logger.error(error.message);

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException(
          'An error occurred during login',
        );
      }
    }
  }

  @Post('register')
  async register(@Body() { email, password, confirmPassword, fullname }: RegisterUserDto ): Promise<UserEntity> {
    try { 
      const user = await this.loginAuthUseCase.register(email, password, confirmPassword, fullname);

      return user
    } catch (error) {
      Logger.error(error.message);

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException(
          'An error occurred during login',
        );
      }
    }
  }

}
