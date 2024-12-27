import {
  Controller,
  Post,
  Body,
  UsePipes,
  BadRequestException,
  InternalServerErrorException,
  Logger,
  HttpStatus,
  HttpCode,
  Get,
  Req,
} from '@nestjs/common';
import { CreateUserDto, CreateUserSchema } from '../dto/create-user-dto';
import { CreateUserUseCase } from 'src/User/application/use-cases/create-user-use-case';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation-pipe';
import { LoginUserUseCase } from 'src/User/application/use-cases/login-user-use-case';
import { LoginUserDto } from '../dto/login-user-dto';
import { GetInfoUserUseCase } from 'src/User/application/use-cases/get-user-info-use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly UserinfoUseCase: GetInfoUserUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.createUserUseCase.execute(createUserDto);
      return user;
    } catch (error) {
      Logger.error('Error creating user:', error);

      if (error instanceof BadRequestException) {
        throw new BadRequestException(error);
      } else {
        throw new InternalServerErrorException('Error al crear el usuario.');
      }
    }
  }

  @Post('login')
  async login(@Body() { email, password }: LoginUserDto) {
    try {
      const user = await this.loginUserUseCase.execute(email, password);
      return user;
    } catch (error) {
      Logger.error(error.message);
      return new BadRequestException(error.message);
    }
  }

  @Get('info')
  async setInfo(@Req() res) {
    const { email } = res.user;
    try {
      const user = await this.UserinfoUseCase.execute({ email });
      if (!user) {
        throw new BadRequestException('Invalid email or password');
      }
      return user;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
