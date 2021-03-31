import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-changepswd',
  templateUrl: './changepswd.component.html',
  styleUrls: ['./changepswd.component.css']
})
export class ChangepswdComponent implements OnInit {
  confirmPassword;
  newPassword;
  @ViewChild('new') newPswd:ElementRef;
  @ViewChild('confirm') cnfrmPswd:ElementRef;
  constructor() { }
  submit(){
    console.log(this.newPswd.nativeElement.value);
    console.log(this.cnfrmPswd.nativeElement.value);
  }
  clear(){

  }
  ngOnInit(): void {
  }

}
