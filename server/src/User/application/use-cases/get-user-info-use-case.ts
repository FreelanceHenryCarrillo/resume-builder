import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/User/domain/entities/user-entity';
import { UserRepository } from 'src/User/domain/interface/user-respository.interface';
import { UserInfoDto } from 'src/User/infrastructure/dto/get-info-dto';

@Injectable()
export class GetInfoUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  async execute(info: UserInfoDto): Promise<UserEntity> {
   
    const res = await this.userRepository.findByName(info.email);

    return res;
  }
}
