import { UserEntity } from "src/User/domain/entities/user-entity";

export interface IToken {
  token: string;
}

export interface AuthRepositoryImpls {
  login(email: string, password: string):  Promise<IToken> ;
  register(
    email: string,
    password: string,
    confirmPassword: string,
    fullname: string,
  ): Promise<UserEntity | null>;
}
