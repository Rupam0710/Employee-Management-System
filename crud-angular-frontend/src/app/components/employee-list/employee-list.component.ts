import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/interfaces/employee';
import { AppState } from 'src/app/reducers';
import { HttpService } from 'src/app/services/http.service';
import { selectAllEmployees } from '../store/selector/employee.selector';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
      employeeList : IEmployee[]=[];
      httpService = inject(HttpService);

      employeeList$ : Observable<IEmployee[]>;
      constructor(private router:Router,private toastr:ToastrService,private store:Store<AppState>){}

      displayedColumns:string[] = [
        'id',
        'name',
        'email',
        'phone',
        'age',
        'salary',
        'action',
      ];
      ngOnInit(): void {
          this.httpService.getAllEmployee().subscribe((result)=>{
            this.employeeList = result;
            // this.employeeList$ = this.store.pipe(select(selectAllEmployees));
            console.log(this.employeeList);
            
          })


      }

      public edit(id:number){
         console.log(id);
         this.router.navigate(['/employee/' + id])
         
      }

      public delete(id:number){
        this.httpService.deleteEmployee(id).subscribe(()=>{
          console.log("deleted");
          this.toastr.success("Employee deleted successfully!");
          this.employeeList = this.employeeList.filter(x=>x.id!=id);
          
        })
      }


}
