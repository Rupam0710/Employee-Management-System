import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

import { IEmployee } from 'src/app/interfaces/employee';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { EmployeeListComponent } from './employee-list.component';

xdescribe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let httpService: HttpService;
  let toastrService: ToastrService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
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
        {
          provide: HttpService,
          useValue: jasmine.createSpyObj('HttpService', [
            'getEmployee',
            'createEmployee',
            'updateEmployee',
            'getAllEmployee',
          ]),
        },
        {
          provide: ToastrService,
          useValue: jasmine.createSpyObj('ToastrService', ['success']),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl']),
        },
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
    fixture = TestBed.createComponent(EmployeeListComponent);
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
});
