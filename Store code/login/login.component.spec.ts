import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { HttpService } from 'src/app/services/http.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formBuilder: FormBuilder;
  let httpService: jasmine.SpyObj<HttpService>;
  let router: any;

  beforeEach(async () => {
    const httpServiceSpy = jasmine.createSpyObj('HttpService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        FormBuilder,
        { provide: HttpService, useValue: httpServiceSpy }
      ]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    router = TestBed.inject(RouterTestingModule);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form with email and password fields', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  
  it('should call httpService.login and navigate to home on successful login', () => {
    const email = 'test@example.com';
    const password = 'password';
    const token = 'mockToken';

    component.loginForm.setValue({ email, password });
    httpService.login.and.returnValue(of({ token }));
    const navigateSpy = spyOn(component.router, 'navigateByUrl');

    component.onLogin();

    expect(httpService.login).toHaveBeenCalledWith(email, password);
    expect(localStorage.getItem('token')).toBe(token);
    expect(navigateSpy).toHaveBeenCalledWith('/');
  });

});