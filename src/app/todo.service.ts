import { Todo } from './Todo.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todos: Todo[] = [];
  addTodo(todo: Todo) {
    this.todos.push(todo);
  }
  modifyTodo(index, task) {
    this.todos[index].taskString = task;
  }
  removetodo(index: number) {
    if (this.todos.length === 1) {
      this.todos = [];
    } else {
      this.todos.splice(index, 1);
    }
    console.log('after dltng ');
  }
}
