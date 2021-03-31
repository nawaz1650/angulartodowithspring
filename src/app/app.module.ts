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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditComponent } from './edit/edit.component';
import { AuthInterceptor } from './auth-interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './forgot-password/otp/otp.component';
import { ChangepswdComponent } from './forgot-password/changepswd/changepswd.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    DeleteDirective,
    FilterPipe,
    LoginComponent,
    TodoComponent,
    EditComponent,
    ForgotPasswordComponent,
    OtpComponent,
    ChangepswdComponent,
    SpinnerComponent,
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
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
