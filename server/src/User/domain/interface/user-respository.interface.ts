import { UserEntity } from "../entities/user-entity";

export interface UserRepository {
    findByName(id: string): Promise<UserEntity | null>;
    save(user: UserEntity): Promise<UserEntity>;
    update(user: UserEntity): Promise<UserEntity>;
  }