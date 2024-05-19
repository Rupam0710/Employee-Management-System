import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { IEmployee } from '../interfaces/employee';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return employee list', () => {
    const mockEmployees: IEmployee[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', salary: 50000, age: 30, password: 'password' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '9876543210', salary: 60000, age: 35, password: 'password' }
    ];

    service.getAllEmployee().subscribe(employees => {
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne('https://localhost:7174/api/Employee');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });

  it('should create an employee', () => {
    const newEmployee: IEmployee = {
      id: 3,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '5555555555',
      salary: 70000,
      age: 40,
      password: 'password'
    };

    service.createEmployee(newEmployee).subscribe(employee => {
      expect(employee).toEqual(newEmployee);
    });

    const req = httpMock.expectOne('https://localhost:7174/api/Employee');
    expect(req.request.method).toBe('POST');
    req.flush(newEmployee);
  });

  // Similar tests for getEmployee, updateEmployee, deleteEmployee, and login methods
  it('should get a specific employee', () => {
    const employeeId = 1;
    const mockEmployee: IEmployee = {
      id: employeeId,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      salary: 50000,
      age: 30,
      password: 'password'
    };
  
    service.getEmployee(employeeId).subscribe(employee => {
      expect(employee).toEqual(mockEmployee);
    });
  
    const req = httpMock.expectOne(`https://localhost:7174/api/Employee/${employeeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployee);
  });
  
  it('should update an employee', () => {
    const employeeId = 1;
    const updatedEmployee: IEmployee = {
      id: employeeId,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      salary: 60000,
      age: 35,
      password: 'password'
    };
  
    service.updateEmployee(employeeId, updatedEmployee).subscribe(employee => {
      expect(employee).toEqual(updatedEmployee);
    });
  
    const req = httpMock.expectOne(`https://localhost:7174/api/Employee/${employeeId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedEmployee);
  });
  
  it('should delete an employee', () => {
    const employeeId = 1;
  
    service.deleteEmployee(employeeId).subscribe(() => {
      expect().nothing();
    });
  
    const req = httpMock.expectOne(`https://localhost:7174/api/Employee/${employeeId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
  
  it('should log in', () => {
    const email = 'john@example.com';
    const password = 'password';
    const mockResponse = { token: 'mockToken' };
  
    service.login(email, password).subscribe(response => {
      expect(response.token).toBe('mockToken');
    });
  
    const req = httpMock.expectOne('https://localhost:7174/api/Auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });
    req.flush(mockResponse);
  });
  
});
