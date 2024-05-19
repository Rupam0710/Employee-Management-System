import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from '../interfaces/employee';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  apiUrl = 'https://localhost:7174';
  http = inject(HttpClient);
  constructor(private router:Router) { }

  public getAllEmployee():Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.apiUrl + '/api/Employee');
  }

  public createEmployee(employee:IEmployee){
    return this.http.post<IEmployee>(this.apiUrl + '/api/Employee', employee);
  }

  public getEmployee(employeeId:number){
    return this.http.get<IEmployee>(this.apiUrl + '/api/Employee/' + employeeId);
  }

  public updateEmployee(employeeId: number, employee: IEmployee) {
    return this.http.put<IEmployee>(
      this.apiUrl + '/api/Employee/' + employeeId,
      employee
    );
  }
  public deleteEmployee(employeeId: number) {
    return this.http.delete(
      this.apiUrl + '/api/Employee/' + employeeId);
  }

  public login(email:string,password:string) :Observable<any>{
    return this.http.post<{token:string}>(this.apiUrl + '/api/Auth/login', {email:email,password:password})
  //   .pipe(switchMap((user) =>{
  //     if(user){
  //       localStorage.setItem('token',user.token);
  //       this.router.navigateByUrl('/');
  //       return of(user)
  //     }else{
  //       return throwError('Unable to login')
  //     }
  //   })
  // )
}


}
