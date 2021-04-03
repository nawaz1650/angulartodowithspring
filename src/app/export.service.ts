import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http:HttpClient) { }
  export(){
    return this.http.
    //get(`http://localhost:8080/export/${localStorage.getItem('userid')}`,
    get(`https://springbootapp-todo.herokuapp.com//export/${localStorage.getItem('userid')}`,
    {responseType:"blob"}).
    pipe(map((res)=>{console.log("from map ",res)
    //do research
    //const blob = new Blob([res], { type: 'application/octet-stream' });
    //const blob = new Blob([res], { type: 'application/vnd.ms-excel' });//working
    const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //const blob = new Blob([res], { type: 'text/xlsx' });
    const url= window.URL.createObjectURL(blob);
    var a =document.createElement('a');
    document.body.appendChild(a);
    a.style.display='none';
    a.href=url;
    a.download="Todo.xlsx";
    a.click();
    //window.open(url);
  })
    ,
    catchError((e:any) => {
      console.log("from error ",e);
      return of(1);
    }
    ))
  }
}
