import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { ManagerCrudService } from 'src/app/service/manager-crud.service';
import { Manager } from 'src/model/manager';
import data from '../../../assets/json/data.json';


import { ManagersListComponent } from './managers-list.component';

describe('ManagersListComponent', () => {
  let component: ManagersListComponent;
  let fixture: ComponentFixture<ManagersListComponent>;
  let mockService: ManagerCrudService;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj(['getUsers']).andReturn;
    TestBed.overrideProvider(ManagerCrudService, { useValue: mockService });
    await TestBed.configureTestingModule({
      declarations: [ ManagersListComponent ],
      providers: [ DatePipe ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDividerModule,
        BrowserAnimationsModule
      ]      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render Current Managers', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Current Managers');
  });

  it('should be created', inject([ManagerCrudService], (myService: ManagerCrudService) => {
    expect(component).toBeTruthy();
  }));

  beforeEach( inject([ManagerCrudService], (myService: ManagerCrudService) => {
      spyOn(myService, 'getUsers').and.returnValue(of(data));
      component.fetchManagers();
  }));

  it('should call getManagers and return 3 managers', () => {
    expect(component.managers.length).toEqual(3);
  });

  it('should call getManagers and return ManagerName', () => {
    expect(component.managers[0].managerName).toEqual("Manager1");
  })
  it('should call getManagers and return Manager with Teams', () => {
    expect(component.managers[2].teams).toContain("Team3");
  })
  it('should call getManagers and return Manager with ActiveStatus is true', () => {
    expect(component.managers[1].activeStatus).toEqual(true)
  })
});
