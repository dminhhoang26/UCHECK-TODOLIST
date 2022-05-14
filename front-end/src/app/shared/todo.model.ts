export class Todo {
  constructor(
    public text?: string | undefined,
    public complete?: number | undefined,
    public id?: number | undefined,
    public userId?: number | undefined,
    public remarks?: string | undefined,
    public focus?: boolean | undefined,
    public startTime?: string | undefined,
    public endTime?: string | undefined,
    public createdDate?: Date | undefined,
  ) { }
}
