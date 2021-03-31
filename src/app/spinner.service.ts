import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  //loading:false;
  subjct=new Subject<boolean>();
  constructor() { }
}
