export class PrintResumeEntity {
  constructor(
    public title?: string,
    public data?: JSON,
    public locked?: boolean,
    public userId?: string
  ) {}
}
