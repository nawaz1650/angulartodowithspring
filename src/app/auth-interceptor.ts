import { SpinnerService } from './spinner.service';
import { HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { finalize, tap } from "rxjs/operators";
import { Injectable } from '@angular/core';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private spinnerSer:SpinnerService){}
    intercept(req:HttpRequest<any>,next:HttpHandler){
        this.spinnerSer.subjct.next(true);
        console.log("is signup req ",req.url.indexOf('signup'),req.url);
        //const mdfdReq=req.clone({headers:req.headers.set('Authorization',`Bearer ${localStorage.getItem('Authorization')}`)});
        const mdfdReq=req.clone({headers:new HttpHeaders({
            'Content-type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('Authorization')}`
        })});
        //console.log(mdfdReq.headers);
        if(req.url.indexOf('login') == -1 && req.url.indexOf('sign') == -1 && req.url.indexOf('forgot') == -1  && req.url.indexOf('validate') == -1 && req.url.indexOf('resetPassword')== -1)
        req=mdfdReq;
        return next.handle(req).pipe(finalize(
            (
                //evnt:HttpEvent<any>
                )=>{
                //if(evnt.type==4)
                this.spinnerSer.subjct.next(false);
                //console.log(evnt.type);
            }
        )
        //     tap(
        //  )
         );
        // else
        // return next.handle(req).pipe(tap(evnt=>{
        //     console.log(evnt);
        // }));
    }
}