import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/store/selectors/auth.selector';
import { login, logout } from './auth/store/actions/auth.actions';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-angular-dotnet';

  isLoggedIn$ : Observable<boolean>;
  isLoggedOut$ : Observable<boolean>;

  constructor(private router: Router,private store: Store<AppState>) {

  }
  ngOnInit(){
     
    const userEmail = localStorage.getItem('User Email');
    const userPassword = localStorage.getItem('User Password');
    if(userEmail && userPassword){
      this.store.dispatch(login({email:JSON.parse(userEmail), password:JSON.parse(userPassword)}));
    }
    
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  public logout(){
    this.store.dispatch(logout());
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  // public login(){
  //   this.router.navigate(['/login']);
  // }
}
