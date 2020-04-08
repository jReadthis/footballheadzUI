import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed,
} from '@angular/core/testing';

import { OwnersComponent } from './owners.component';
import { OwnerService } from '../owner.service';
import { of } from 'rxjs';
import { Owner } from './owner';

describe('OwnersComponent', () => {
  let component: OwnersComponent;
  let fixture: ComponentFixture<OwnersComponent>;
  let ownerService: OwnerService;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwnersComponent],
      providers: [
        {
          provide: OwnerService,
          useValue: {
            getOwners: () =>
              of({
                body: {
                  ownerName: 'OwnerName',
                  teamName: 'teamName',
                  ownerActiveSince: '2012-09-01',
                  ownerActiveStatus: true,
                  teamActiveSince: '2012-08-01',
                  teamActiveStatus: false,
                },
              }),
          },
        },
      ],
    }).compileComponents();
    injector = getTestBed();
    ownerService = injector.get(OwnerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnersComponent);
    component = fixture.componentInstance;
    ownerService = TestBed.get(OwnerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getOwners', () => {
    beforeEach(() => {
      spyOn(ownerService, 'getOwners').and.callThrough();
      component.ngOnInit();
      fixture.detectChanges();
    });
    it('should call owner service', () => {
      expect(ownerService.getOwners).toHaveBeenCalled();
    });
  });
});
