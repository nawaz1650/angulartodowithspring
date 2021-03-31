import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
@Injectable({providedIn:'root'})
export class ForgotPasswordService{
  resetpswd(username: string, email: string, newpswd: string) {
    //throw new Error('Method not implemented.');

    //return this.http.post<any>('http://localhost:8080/resetPassword',{
        return this.http.post<any>('https://springbootapp-todo.herokuapp.com/resetPassword',{
        username:username,email:email,newpswd:newpswd
    }).pipe(
        map(
            (res)=>{
                console.log(res);
                return res;
            }
        ),
        catchError((error)=>{
            console.log(error);
            return of(1);
        })
    )
  }
  validateOtp(username: String, email:String, otp: string) {
    return this.http.post<any>('https://springbootapp-todo.herokuapp.com/validateOtp',{
    //return this.http.post<any>('http://localhost:8080/validateOtp',{
        username:username,email:email,otp:otp
    }).pipe(
        map(
            (res)=>{
                console.log(res);
                return res;
            }
        ),
        catchError((error)=>{
            console.log(error);
            return of(1);
        })
    )
  }
    constructor(private http:HttpClient){

    }
generateOtp(username:String,email:string){
    //return this.http.post<any>('http://localhost:8080/forgotpassword',{
        return this.http.post<any>('https://springbootapp-todo.herokuapp.com/forgotpassword',{
        username:username,email:email
    }).pipe(
        map(
            (res)=>{
                console.log(res);
                return res;
            }
        ),
        catchError((error)=>{
            console.log(error);
            return of(error.error.message);
        })
    )
}
}