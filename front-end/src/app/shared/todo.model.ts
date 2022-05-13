export class Todo {
  constructor(
    public text?: string | undefined,
    public completed: boolean | undefined = false,
    public id?: number | undefined,
    public userId?: number | undefined,
    public description?: string | undefined,
    public priority?: string | undefined,
    public status?: string | undefined,
    public dueDate?: Date | undefined,
    public startDate?: Date | undefined,
    public createdDate?: Date | undefined,
  ) { }
}
