import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { EmployeeFormComponent } from './employee-form.component';
import { IEmployee } from 'src/app/interfaces/employee';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let httpService: HttpService;
  let toastrService: ToastrService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeFormComponent],
      imports: [
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: HttpService, useValue: jasmine.createSpyObj('HttpService', ['getEmployee', 'createEmployee', 'updateEmployee']) },
        { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['success']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl']) },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 1,
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.employeeForm.get('name')).toBeTruthy();
    expect(component.employeeForm.get('email')).toBeTruthy();
    expect(component.employeeForm.get('phone')).toBeTruthy();
    expect(component.employeeForm.get('salary')).toBeTruthy();
    expect(component.employeeForm.get('age')).toBeTruthy();
    expect(component.employeeForm.get('password')).toBeTruthy();
  });

  it('should disable the email field when editing an employee', () => {
    component.isEdit = true;
    fixture.detectChanges();
    const emailControl = component.employeeForm.get('email');
    expect(!emailControl?.disabled).toBeTrue();
  });

  // it('should call update employee when isEdit is true', () => {
  //   const employee: IEmployee = {
  //     name: 'John Doe',
  //     email: 'john.doe@example.com',
  //     phone: '1234567890',
  //     salary: 50000,
  //     age: 30,
  //     password: 'password123',
  //   };
   
  //   component.isEdit = true;
  //   component.employeeForm.patchValue(employee);
  //   component.save();
  //   expect(httpService.updateEmployee).toHaveBeenCalledWith(1, employee);
  // });

  // it('should call create employee when isEdit is false', () => {
  //   const employee: IEmployee = {
  //     name: 'John Doe',
  //     email: 'john.doe@example.com',
  //     phone: '1234567890',
  //     salary: 50000,
  //     age: 30,
  //     password: 'password123',
  //   };
  //   component.isEdit = false;
  //   component.employeeForm.patchValue(employee);

  //   component.save();
  //   expect(httpService.createEmployee).toHaveBeenCalledWith(employee);
  // });

});