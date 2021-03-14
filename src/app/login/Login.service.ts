import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/Reducers/Appreducer';
@Injectable({ providedIn: 'root' })
export class LoginService {
  username;
  constructor(private store: Store<AppState>) {
    this.store.select('auth').subscribe((authstate) => {
      this.username = authstate.username;
    });
  }
}
