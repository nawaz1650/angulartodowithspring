import { Todo } from './Todo.model';
import { TodoService } from './todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TodoApp';
  newtodo: string;
  todoUnderEdit = '';
  searchMode = false;

  editId = -1;
  search = '';
  todos: Todo[];

  config: any;

  markAsComplete() {
    this.todoservice.todos[this.editId].completed = true;
    this.cancelEdit();
  }

  pageChanged(event) {
    console.log('from page change', event);
    this.config.currentPage = event;
  }

  saveModifiedTodo() {
    this.todoservice.modifyTodo(this.editId, this.todoUnderEdit);
    this.cancelEdit();
  }

  cancelEdit() {
    this.editId = -1;
    this.todoUnderEdit = '';
  }
  activateEdit(index: number) {
    this.editId = index;
    this.todoUnderEdit = this.todoservice.todos[index].task;
  }
  ngOnInit() {
    this.todos = this.todoservice.todos;
  }
  constructor(public todoservice: TodoService) {
    this.config = {
      id: 'server',
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.todoservice.todos.length,
    };
  }
  getTodos() {
    return this.todoservice.todos;
  }
  onSubmit() {
    const temp = this.prepareTodo(this.newtodo);
    this.todoservice.addTodo(temp);
    this.newtodo = '';
    this.search = '';
  }
  searchEnable() {
    this.searchMode = !this.searchMode;
    console.log('search mode', this.searchMode);
    console.log('this.search', this.search);
    console.log('this.newtodo', this.newtodo);
  }
  prepareTodo(todo: string) {
    const id = this.todoservice.todos.length + 1;
    return new Todo(todo, id, false);
  }
  removethistodo(id: number) {
    console.log('index rcvd ', id);
    this.todoservice.removetodo(id);
    console.log('todoservice todos r now ', this.todoservice.todos);
  }
}
