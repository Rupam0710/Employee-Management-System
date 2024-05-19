import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  Store } from '@ngrx/store';
import { noop, tap } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { AuthActions } from 'src/app/store/actions/action-types';
import { AppState } from 'src/app/store/reducers/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private formBuilder:FormBuilder,private httpService:HttpService,public router:Router
    ,private store:Store<AppState>){}

  loginForm = this.formBuilder.group({
    email:['', [Validators.required]],
    password:['', [Validators.required]]
  })

  public onLogin(){
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    
    this.store.dispatch(AuthActions.loginPage({email:email,password:password}));

    // this.httpService.login(email,password).subscribe((result)=>{
    //   console.log(result);
    //   localStorage.setItem('token',result.token);
    //   this.router.navigateByUrl('/');
    // });

    // this.httpService.login(email,password)
    // .pipe(tap(user => {
    //   if(user){
    //     localStorage.setItem('token',user.token);
    //     this.store.dispatch(AuthActions.loginPage({ email: email, password: password }));
    //     this.router.navigateByUrl('/');
    //   }
    // })).subscribe(noop,()=>alert('Login failed'));


  }

  }

