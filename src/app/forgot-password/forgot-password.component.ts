import { ChangepswdComponent } from './changepswd/changepswd.component';
import { OtpComponent } from './otp/otp.component';
import { ForgotPasswordService } from './../forgot-password.service';
import { HttpClient } from '@angular/common/http';

import { LoginStart, SignupStart } from './../store/Actions/Login/authactions';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit,OnDestroy {
dialogref;
info;
 subs1:Subscription;
 subs2:Subscription;
 subs3:Subscription;
 dialogsubs1:Subscription;
 dialogsubs2:Subscription;
 dialogsubs3:Subscription;
  error = null;
  constructor(
    private http:HttpClient,
    private router: Router,
    private route: ActivatedRoute,private forgotpswdser:ForgotPasswordService,private matdialog:MatDialog
  ) {}

  @ViewChild('f') loginform: NgForm;
  ngOnInit(): void {
    
  }
  submit() {
    this.info='';
    this.subs1=this.forgotpswdser.
    generateOtp(this.loginform.controls.username.value,this.loginform.controls.email.value).subscribe((res:any)=>{
      console.log("from subscription of fp comp ",res);
        
      if(res.success){
        let dialogref=this.matdialog.open(OtpComponent,{disableClose:true});
        alert('plz check your email for otp');
        this.dialogsubs1 =dialogref.afterClosed().subscribe(res=>{
          console.log(res);
          if(res){
           this.dialogsubs2 =this.forgotpswdser.validateOtp(this.loginform.controls.username.value,this.loginform.controls.email.value,res).
            subscribe(res=>{
              console.log(res);
              if(res.success){
                console.log("otp verified");
                const chngpswddialogref=this.matdialog.open(ChangepswdComponent,{disableClose:true});
                chngpswddialogref.afterClosed().subscribe(newpswd=>{
                  if(res){
                   this.dialogsubs3= this.forgotpswdser.resetpswd(this.loginform.controls.username.value,this.loginform.controls.email.value,newpswd).
                    subscribe(res=>{
                      console.log(res);
                      if(res.success){
                        this.info="password successfully reseted.plz login now.."
                      }
                      else{
                        this.dialogsubs3.unsubscribe();
                      }
                    });
                  }
                })
              }
              else
              {
                this.info='OTP expired or invalid OTP';
                this.dialogsubs2.unsubscribe();
              }
            });
          }
          else{
            this.dialogsubs1.unsubscribe();
          }
        })
      }
      else{
        this.info=res;
        this.subs1.unsubscribe();
      }
    });
    //console.log('from submit method', this.loginform.value);
  }
  clearform() {
    this.loginform.controls.username.setValue('');
    this.loginform.controls.email.setValue('');
    }
ngOnDestroy(){
  if(this.subs1)
  this.subs1.unsubscribe();
  if(this.subs2)
  this.subs2.unsubscribe();

if(this.subs3)
  this.subs3.unsubscribe();
  if(this.dialogsubs1)
  this.dialogsubs1.unsubscribe();
  if(this.dialogsubs2)
  this.dialogsubs2.unsubscribe();
  if(this.dialogsubs3)
  this.dialogsubs3.unsubscribe();
}


  }
