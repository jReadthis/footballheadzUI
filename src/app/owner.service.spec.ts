import { TestBed, getTestBed } from '@angular/core/testing';
import { OwnerService } from './owner.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
import { Owner } from './owners/owner';

describe('OwnerService', () => {
  let injector: TestBed;
  let ownerService: OwnerService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OwnerService],
    });
    injector = getTestBed();
    ownerService = injector.get(OwnerService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: OwnerService = ownerService;
    expect(service).toBeTruthy();
  });

  describe('getOwners', () => {
    let dummyOwners: any;
    beforeEach(() => {
      dummyOwners = {
        body: [{ ownerName: 'ownerName' }, { ownerName: 'teamName' }],
      };
    });
    it('should return 2 owners and have ownerName', (done) => {
      const data = dummyOwners;
      ownerService.getOwners().subscribe((data) => {
        expect(data.body.length).toBe(2);
        expect(data.body).toEqual(dummyOwners);
        done();
      });
      const URL = `${ownerService.BASE_URL}`;
      const httpRequest = httpMock.expectOne(URL);
      expect(httpRequest.request.method).toBe('GET');
      httpRequest.flush(data);
    });
  });

  describe('getOwner', () => {
    let dummyOwner: any;
    beforeEach(() => {
      dummyOwner = [{ ownerName: 'dummy' }];
    });
    it('should return 1 owner and have dummyName', (done) => {
      const data = dummyOwner;
      ownerService.getOwner('dummy').subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(dummyOwner);
        done();
      });
      const URL = `${ownerService.BASE_URL}`;
      const httpRequest = httpMock.expectOne(URL + '/dummy');
      expect(httpRequest.request.method).toBe('GET');
      httpRequest.flush(data);
    });
  });
});
