import {
  FetchTodoFail,
  UPDATE_TODO_START,
  UpdateTodoStart,
  FetchTodoSuccess,
  TODO_ADD_START,
  TodoAddStart,
  TodoAddSuccess,
  UpdateTodoSuccess,
  UpdateTodoFail,
  TodoAddFail,DELETE_TODO_START, DELETE_TODO_FAIL, DeleteTodoFail, DeleteTodoStart,DeleteTodoSuccess
} from './../Actions/Login/Todo/Todo-actions';
import { LoginSuccess, SIGNUP_START, SignupStart, SignupFail } from './../Actions/Login/authactions';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import * as authactions from '../Actions/Login/authactions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Injectable, Pipe } from '@angular/core';
import { of } from 'rxjs';
import {
  FetchTodoStart,
  FETCH_TODO_START,
} from '../Actions/Login/Todo/Todo-actions';
import { Todo } from 'src/app/Todo.model';

@Injectable()
export class AuthEffect {
  @Effect()
  logineffect = this.actions$.pipe(
    ofType(authactions.LOGIN_START),
    switchMap((logindata: authactions.LoginStart) => {
      console.log('from login effect');
      return this.http
      //uncomment
        .post<any>('https://springbootapp-todo.herokuapp.com/login', {
//.post<any>('http://localhost:8080/login', {
          username: logindata.payload.username,
          password: logindata.payload.password,
        })
        .pipe(
          map((res) => {
            
            console.log(res);
            console.log('from auth effect success');
            localStorage.setItem('username', res.username);
            localStorage.setItem('userid', res.userid);
            localStorage.setItem('Authorization',res.token);
            return new LoginSuccess(res);
          }),
          catchError((error) => {
            console.log(error);
            console.log('from auth effect error', error.error.message);
            if(error.error.message)
            return of(new authactions.LoginFail(error.error.message));
            else
            return of(new authactions.LoginFail("some error occured"));
          })
        );
    })
  );
  @Effect()
  todoeffect = this.actions$.pipe(
    ofType(FETCH_TODO_START),
    switchMap((todostart: FetchTodoStart) => {
      return this.http
        .get<Todo[]>(
          //uncomment before release
          `https://springbootapp-todo.herokuapp.com/User/${todostart.payload.userid}/Todos`
          // `http://localhost:8080/User/${todostart.payload.userid}/Todos`
        )
        .pipe(
          map((res) => {
            console.log('from fetch todo success', res);
            return new FetchTodoSuccess({ todos: res });
          }),
          catchError((e) => {
            return of(new FetchTodoFail());
          })
        );
    })
  );

  @Effect()
  todoaddeffect=this.actions$.pipe(ofType(TODO_ADD_START),switchMap((actiondata:TodoAddStart)=>{
    console.log("from todoeffect  ",actiondata);
    //uncomment b4 release
return this.http.post<any>(`https://springbootapp-todo.herokuapp.com/User/${localStorage.getItem('userid')}/Todo`,
// return this.http.post<any>(`http://localhost:8080/User/${localStorage.getItem('userid')}/Todo`,
{taskString:actiondata.payload.taskString,completedString:actiondata.payload.completedString}).
pipe(map((res)=>{
  console.log(res);
  return new TodoAddSuccess(res);
}),catchError((e)=>{
  return of(new TodoAddFail(e))
})
)
  }));

  @Effect()
  deletetodoeffect=this.actions$.pipe(ofType(DELETE_TODO_START),switchMap((data:DeleteTodoStart)=>{
    console.log("from swich map of delete todo effect ",data);
    //uncomment before release
    return this.http.delete<any>(`https://springbootapp-todo.herokuapp.com/users/${localStorage.getItem('userid')}/Todos/${data.payload.id}`)
    // return this.http.delete<any>(`http://localhost:8080/users/${localStorage.getItem('userid')}/Todos/${data.payload.id}`)
    .pipe(
      map((res)=>{
        //console.log(res," from delete todo effect");
        return new DeleteTodoSuccess({id:data.payload.frontendid});
      }),
      catchError(e=>{
        return of(new DeleteTodoFail())
      })
    )
  }));

  @Effect()
  updatetodostarteffect=this.actions$.pipe(
    ofType(UPDATE_TODO_START),
    switchMap(
      (updateTodoStartData:UpdateTodoStart)=>{
        console.log("from switch map of update todo start ",updateTodoStartData);
          return this.http.put<UpdateTodoStart>
          //uncomment before release
          (`https://springbootapp-todo.herokuapp.com/users/${localStorage.getItem('userid')}`
          // (`http://localhost:8080/users/${localStorage.getItem('userid')}`
          ,{todoid:updateTodoStartData.payload.todoid,taskString:updateTodoStartData.payload.taskString,completedString:updateTodoStartData.payload.completedString}).pipe(
            map(
              (res)=>{
                return   new UpdateTodoSuccess({ todoid: updateTodoStartData.payload.frontendid,
                  taskString: updateTodoStartData.payload.taskString,
                  completedString: updateTodoStartData.payload.completedString});
              }
            ),
            catchError((e)=>{
                return of(new UpdateTodoFail());
            })
          )
      }
    )
  )
  @Effect()
  signupstarteffect=this.actions$.pipe(
    ofType(SIGNUP_START),
    switchMap((signupdata:SignupStart)=>{
      //uncomment b4 release
      return this.http.post<any>("https://springbootapp-todo.herokuapp.com/signup",{
//  return this.http.post<any>("http://localhost:8080/signup",{
        username:signupdata.payload.username,
        email:signupdata.payload.email,
        password:signupdata.payload.password
      }).pipe(
        map((res)=>{
          console.log("from aignup effect success ",res);
          localStorage.setItem('username', res.username);
          localStorage.setItem('userid', res.userid);
          return new authactions.SignupSuccess(res);
        }),
        catchError((e:HttpErrorResponse)=>{
          console.log("from signup effect fail ",e);
          if(e.error.message)
          return of(new SignupFail(e.error.message));
          else
          return of(new SignupFail("some error occuerd"));

        })
      )
    })
    )
  constructor(public actions$: Actions, private http: HttpClient) {}
}
