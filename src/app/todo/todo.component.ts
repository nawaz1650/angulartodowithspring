import { Router } from '@angular/router';
import { EditComponent } from './../edit/edit.component';
import { map } from 'rxjs/operators';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import {
  DeleteTodoStart,
  TodoAddStart,
  UpdateTodoStart,
} from './../store/Actions/Login/Todo/Todo-actions';
import { Component, NgZone, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/Reducers/Appreducer';
import { Todo } from '../Todo.model';
import { TodoService } from '../todo.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit,OnDestroy {
  title = 'TodoApp';
  username:string;
  subscription:Subscription;
  newtodo: string;
  todoUnderEdit = '';
  searchMode = false;
  p: number = 1;

  editId = -1;
  search = '';
  todos: Todo[];

  config: any;

  markAsComplete() {
    this.todoservice.todos[this.editId].completedString = true;
    this.cancelEdit();
  }

  pageChanged(event) {
    console.log('from page change', event);
    this.config.currentPage = event;
  }

  // saveModifiedTodo() {
  //   //this.todoservice.modifyTodo(this.editId, this.todoUnderEdit);
  //   this.store.dispatch(
  //     new UpdateTodo({
  //       todoid: this.editId,
  //       taskString: this.todoUnderEdit,
  //       completedString: 'no',
  //     })
  //   );
  //   this.cancelEdit();
  // }

  cancelEdit() {
    this.editId = -1;
    this.todoUnderEdit = '';
  }
  activateEdit(index: number) {
    console.log("index received is ",index);
    console.log("current page is ",this.p);
    const calculatedindex=(6*(this.p-1))+index;
    console.log('calculated index is ',(6*(this.p-1))+index);
    const editdialog=this.dialog.open(EditComponent,{data:{editingtodo:this.todos[calculatedindex].taskString},disableClose:true});
    console.log("todo under edit is ",this.todos[calculatedindex]);
    editdialog.afterClosed().subscribe(res=>{
      console.log(res," from dialog");
      if(res==='close'){
        //do nothing
      }
      else if(res==='completed'){
        //mark completed
        this.store.dispatch(new UpdateTodoStart({frontendid: calculatedindex,
          todoid:this.todos[calculatedindex].todoid,
          taskString: this.todos[calculatedindex].taskString,
          completedString: 'yes'}))
      }
      else if(res==undefined||res==''||res==null ){
          //dialogue is closed without any action i.e by clicking outside of it
      }
      else{
        this.store.dispatch(new UpdateTodoStart({frontendid: calculatedindex,
          todoid:this.todos[calculatedindex].todoid,
          taskString: res,
          completedString: 'no'}))
      }
    })
    //this.editId = index;
    //console.log('edit index', index);
    //console.log('edit todo ', this.todos);
    //this.todoUnderEdit = this.todos[index].taskString;
  }
  ngOnInit() {
    this.username=localStorage.getItem('username');
   this.subscription= this.store
      .select('todos')
      .pipe(
        map((todostate) => {
          this.todos = todostate.todos;
          return todostate;
        })
      )
      .subscribe((todostate) => {
        console.log('from ngonit   ', todostate);

        // this.todos = todostate.todos;
        // this.zone.run(() => {
        //   this.cdr.detectChanges();
        // });
      });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  constructor(
    public todoservice: TodoService,
    private store: Store<AppState>,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private dialog:MatDialog,
    private router:Router
  ) {
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
    //this.todoservice.addTodo(temp);
    this.store.dispatch(
      new TodoAddStart({ taskString: this.newtodo, completedString: 'no' })
    );
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
    const calculatedindex=(6*(this.p-1))+id;
    console.log('index rcvd ', calculatedindex);
    this.store.select('todos').subscribe(todos=>{
      console.log("todo id is  ",todos.todos[calculatedindex].todoid);
       this.store.dispatch(new DeleteTodoStart({id:todos.todos[calculatedindex].todoid,frontendid:calculatedindex}))                     
    }).unsubscribe();
    //this.todoservice.removetodo(id);
    //console.log('todoservice todos r now ', this.todoservice.todos);
  }
  logout(){
    console.log("from logout");
    localStorage.clear();
    this.router.navigate(['']);

  }
}
