export class Todo {
  constructor(
    public taskString: string,
    public todoid: number,
    public completedString: boolean = false
  ) {}
}
