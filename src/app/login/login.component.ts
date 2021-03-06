import { LoginStart, SignupStart } from './../store/Actions/Login/authactions';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store/Reducers/Appreducer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit ,OnDestroy{
  loginmode: boolean = true;
  error = null;
  info: string;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild('f') loginform: NgForm;
  ngOnInit(): void {
    this.store.select('auth').subscribe((authstate) => {
      console.log("from ngoninit of login comp")
      if (authstate.error) this.error = authstate.error;
      if (authstate.username && this.loginmode){
        console.log("from if block");
        this.router.navigate(['/todo'], { relativeTo: this.route });
      }
        else if(authstate.username&& !this.loginmode ){
        this.info='signup successfull plz login now..';
        console.log("from else block");
        }
    });
  }
  submit() {
    this.error ='';
    if (this.loginmode)
      this.store.dispatch(
        new LoginStart({
          username: this.loginform.controls.username.value,
          password: this.loginform.controls.password.value,
        })
      );
    //this.store.dispatch()
    else {
      console.log('hey');
      this.store.dispatch(
        new SignupStart({
          username: this.loginform.controls.username.value,
          email:this.loginform.controls.email.value,
          password: this.loginform.controls.password.value,
        })
      );
    }
    //console.log('from submit method', this.loginform.value);
  }
  togglemode() {
    this.loginmode = !this.loginmode;
  }
  ngOnDestroy(){
    console.log("from ng on destroy of login");
    this.error=null;
    
  }
}
