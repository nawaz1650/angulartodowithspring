import { MatModules } from './material.module';
import { DeleteDirective } from './directives/delete-directive';
import { AuthEffect } from './store/Effects/autheffect';
import { Appreducer } from './store/Reducers/Appreducer';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BasicHighlightDirective } from './basic-highlight.directive';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    DeleteDirective,
    FilterPipe,
    LoginComponent,
    TodoComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    StoreModule.forRoot(Appreducer),
    EffectsModule.forRoot([AuthEffect]),
    StoreDevtoolsModule.instrument({ logOnly: false }),
    HttpClientModule,
    MatModules
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
