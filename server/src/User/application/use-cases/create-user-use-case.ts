import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserEntity } from 'src/User/domain/entities/user-entity';
import { UserRepository } from 'src/User/domain/interface/user-respository.interface';
import { CreateUserDto } from 'src/User/infrastructure/dto/create-user-dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );
    const res = await this.userRepository.save(user);

    return res;
  }
}
