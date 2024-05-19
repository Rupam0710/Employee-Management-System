import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login/login.component';
import {MatCardModule} from '@angular/material/card';
import { tokenHttpInterceptor } from './http-intercepter/token-http-intercepter';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from './reducers';
import { AuthModule } from './auth/auth.module';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EmployeeModule } from './components/employee.module';
import { EmployeeResolver } from './components/store/employee.resolver';



@NgModule({
  declarations: [
    AppComponent,
    
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot(),
    EmployeeModule,
    ToastrModule.forRoot(),
    MatCardModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot(reducers, { 
      metaReducers,
      runtimeChecks:{
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability:true,
        
      } }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
   

  ],
  providers: [
    provideHttpClient(withInterceptors([tokenHttpInterceptor])),
    EmployeeResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
