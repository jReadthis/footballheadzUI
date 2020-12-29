import {
  async,
  TestBed,
  getTestBed,
  ComponentFixture,
} from '@angular/core/testing';
import { OwnersComponent } from './owners.component';
import { OwnerService } from '../owner.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../material';
import { of } from 'rxjs';
import { Owner } from './owner';

describe('OwnersComponent', () => {
  let component: OwnersComponent;
  let fixture: ComponentFixture<OwnersComponent>;
  let mockOwnerService;

  beforeEach(async(() => {
    mockOwnerService = jasmine.createSpyObj(['getOwners']);
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [OwnersComponent],
      providers: [DatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    TestBed.overrideProvider(OwnerService, { useValue: mockOwnerService });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = getTestBed().createComponent(OwnersComponent);
    component = fixture.componentInstance;
    const owners: Owner[] = [];
    owners.push(createOwner('Jeff Marca', 'HogPit'));
    owners.push(createOwner('Orlando Marca', 'Gimmydaloot'));
    mockOwnerService.getOwners.and.returnValue(of(owners));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get Owners call should return 2 Owners', () => {
    expect(component.owners.length).toEqual(2);
  });
  it('get Owners call should contain Jeff', () => {
    expect(component.owners[0].OwnerName).toEqual('Jeff Marca');
  });
});

function createOwner(ownerName, teamName) {
  return new TeamOwner(ownerName, teamName);
}

class TeamOwner implements Owner {
  constructor(public OwnerName: string, public TeamName: string) {}
  OwnerActiveSince: string;
  OwnerActiveStatus: boolean;
  TeamActiveSince: string;
  TeamActiveStatus: boolean;
}
