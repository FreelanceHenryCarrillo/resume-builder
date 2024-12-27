export class AuthRegisterEntity {
  constructor(
    public email: string,
    public password: string,
    public confirmPassword: boolean,
    public fullName: string,
  ) {}
}
