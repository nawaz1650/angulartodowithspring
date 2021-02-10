export class Todo {
  constructor(
    public task: string,
    public id: number,
    public completed: boolean = false
  ) {}
}
