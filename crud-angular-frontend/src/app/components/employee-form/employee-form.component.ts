import { employeeReducer } from './../store/reducer/employee.reducers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { IEmployee } from 'src/app/interfaces/employee';
import { AppState } from 'src/app/reducers';
import { HttpService } from 'src/app/services/http.service';
import { EmployeeUpdated, loadAllEmployees } from '../store/action/employee.action';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit{

  mode: 'create' | 'update';

   constructor(private formsBuilder:FormBuilder,private httpService:HttpService,private router:Router,private route:ActivatedRoute,private toastr:ToastrService
    ,private store:Store<AppState>){}

   employeeForm = this.formsBuilder.group({
    name:['', [Validators.required]],
    email:['',[Validators.required, Validators.email]],
    phone:['', []],
    salary:[0, [Validators.required]],
    age:[0,[ Validators.required]],
    password:['', Validators.required]
    
   })
   
   employeeId!: number; 
   isEdit = false;
   public isEmailDisabled = true;
   ngOnInit() {
     this.employeeId = this.route.snapshot.params['id'];
     if (this.employeeId) {
       this.isEdit = true;
       this.httpService.getEmployee(this.employeeId)?.subscribe((result) => {
         console.log(result);
         this.employeeForm.patchValue(result);
        //  this.employeeForm.controls.email.disable();
       });
     }
   }
   save() {
     const emp : IEmployee = this.employeeForm.getRawValue();
     const employee: IEmployee = {
       name: emp.name,
       age: emp.age,
      //  email: this.employeeForm.value.email!,
       email: emp.email,
       phone:emp.phone,
       salary: emp.salary,
       password:emp.password
     };
    
     if (this.isEdit) {
      //  this.httpService
      //    .updateEmployee(this.employeeId, employee)
      //    .subscribe(() => {
      //     this.toastr.success("Employee Updated Successfully!");
      //      console.log('success');
           
      //      this.router.navigateByUrl('/employee-list');
      //    });

      console.log(employee.id);
      
      const update : Update<IEmployee> = {
        id: this.employeeId,
        changes : employee
       }

      this.store.dispatch(EmployeeUpdated({update}));
      
      this.router.navigateByUrl('/employee-list');
     } else {
       this.httpService.createEmployee(employee).subscribe(() => {
         console.log('success');
         this.toastr.success("Employee Added Successfully!");
         this.router.navigateByUrl('/employee-list');
       });
     }

     
   }
}
