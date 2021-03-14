import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  textvalue;
  constructor(@Inject(MAT_DIALOG_DATA) public passedData:any) { }

  ngOnInit(): void {
    this.textvalue=this.passedData.editingtodo;
  }

}
