import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner.service';
import { Todo } from './Todo.model';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private spinnerSer:SpinnerService,private matDialog:MatDialog){}
  ngOnInit(){
    let dialogref;
    this.spinnerSer.subjct.subscribe(res=>{
      if(res){
         dialogref=this.matDialog.open(SpinnerComponent,{disableClose:true});
      }
      else{
        dialogref.close();
      }
    })
  }
}
