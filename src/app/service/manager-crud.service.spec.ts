import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { Manager } from 'src/model/manager';

import { ManagerCrudService } from './manager-crud.service';

describe('ManagerCrudService', () => {
  let service: ManagerCrudService;
  let httpMock: HttpTestingController;
  let dummyManagers: Manager[];
  let dummyManager: Manager;
  let dummyTeams: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ManagerCrudService ]
    });
  });

  beforeEach(inject(
    [HttpTestingController, ManagerCrudService],
    (http: HttpTestingController, managerService: ManagerCrudService) => {
      httpMock = http;
      service = managerService;
    }
  ));

  afterEach(inject([HttpTestingController], (http: HttpTestingController) => {
    http.verify();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  beforeEach(() => {
    dummyManagers = [{
      managerName: 'Manager1',
      teams: createTeams(2),
      activeDate: new Date("2011-09-01"),
      activeStatus: true
    },{
      managerName: 'Manager2',
      teams: createTeams(3),
      activeDate: new Date("2011-08-01"),
      activeStatus: true
    }];

    dummyManager = {
      managerName: 'Manager1',
      teams: createTeams(1),
      activeDate: new Date("2013-09-01"),
      activeStatus: true
    };

    dummyTeams = createTeams(3);
  })

  it('should return list of managers', () => {   
    service.getUsers().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyManagers);
    })
    const req = httpMock.expectOne(service.endpoint + '/manager');
    expect(req.request.method).toBe('GET');
    req.flush(dummyManagers);
  })

  it('should return list of teams by manager', () => {
    let managerName = 'Orlando Marca';   
    service.getTeams(managerName).subscribe(data => {
      expect(data.length).toBe(3);
      expect(data).toEqual(dummyTeams);
    })
    const req = httpMock.expectOne(service.endpoint + '/manager/?managerName=Orlando%20Marca');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTeams);
  })

  it('should return single manager', () => {
    let managerName = 'Orlando Marca';
    service.getSingleUser(managerName).subscribe(data => {
      expect(data).toBeTruthy();
    })
    const req = httpMock.expectOne(service.endpoint + '/manager/' + managerName);
    expect(req.request.method).toBe('GET');
    req.flush(dummyManager);
  })

  it('should delete manager', () => {
    let managerName = 'Orlando Marca';
    service.deleteUser(managerName).subscribe(data =>{
      expect(data).toBeTruthy();
    })
    const req = httpMock.expectOne(service.endpoint + '/manager/' + managerName);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyManagers)
  })

  it('should add manager', () => {
    service.addUser(dummyManager).subscribe(data =>{
      expect(data).toBeTruthy
    })
    const req = httpMock.expectOne(service.endpoint + '/manager');
    expect(req.request.method).toBe('POST');
    req.flush(dummyManager)
  })

});

function createTeams(number: Number) {
  let teams = new Array<String>();
  for (let index = 0; index < number; index++) {
    teams.push('team' + number.toString);
  }
  return teams;
}
