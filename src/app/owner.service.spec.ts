import { TestBed, inject } from '@angular/core/testing';
import { OwnerService } from './owner.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

let service: any;
let httpMock: any;

describe('OwnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  afterEach(inject([HttpTestingController], (http: HttpTestingController) => {
    http.verify();
  }));

  beforeEach(inject(
    [HttpTestingController, OwnerService],
    (http: HttpTestingController, ownerService: OwnerService) => {
      httpMock = http;
      service = ownerService;
    }
  ));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get Owneres should contain 2 users', () => {
    service.getOwners().subscribe((data) => {
      expect(data.body.length).toEqual(2);
      expect(data.body[0].OwnerName).toEqual('Jeff Marca');
    });

    const req = httpMock.expectOne(service.BASE_URL);
    expect(req.request.method).toEqual('GET');
    req.flush([
      {
        TeamActiveStatus: 'true',
        OwnerActiveSince: '2012-09-01',
        OwnerName: 'Jeff Marca',
        TeamActiveSince: '2012-09-01',
        Type: 'Owner',
        OwnerActiveStatus: 'true',
        TeamName: 'TheHogPit',
      },
      {
        TeamActiveStatus: 'true',
        OwnerActiveSince: '2012-11-02',
        OwnerName: 'Matthew',
        TeamActiveSince: '2012-11-02',
        Type: 'Owner',
        OwnerActiveStatus: 'false',
        TeamName: 'DBoysofAmerica1',
      },
    ]);
  });
});
