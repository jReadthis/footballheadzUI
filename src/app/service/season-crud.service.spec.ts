import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { Season } from 'src/model/season';

import { SeasonCrudService } from './season-crud.service';

describe('SeasonCrudService', () => {
  let service: SeasonCrudService;
  let httpMock: HttpTestingController;
  let dummySeasons: Season[];
  let dummySeason: Season;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ SeasonCrudService ]
    });
  });

  beforeEach(inject(
    [HttpTestingController, SeasonCrudService],
    (http: HttpTestingController, seasonService: SeasonCrudService) => {
      httpMock = http;
      service = seasonService;
    }
  ));

  afterEach(inject([HttpTestingController], (http: HttpTestingController) => {
    http.verify();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  beforeEach(() => {
    let teams1 = 

     dummySeasons = [{
      id: '2021|Team1',
      year: '2021',
      rank: '2',
      playoffRank: '1',
      teamName: 'Team1',
      record: '7-0-3',
      pct: 0.08,
      streak: '4W',
      pointsFor: 1938.48,
      pointsAgainst: 1739.54
    },{
      id: '2021|Team2',
      year: '2021',
      rank: '2',
      playoffRank: '1',
      teamName: 'Team2',
      record: '7-0-3',
      pct: 0.08,
      streak: '4W',
      pointsFor: 1938.48,
      pointsAgainst: 1739.54
    }];

    dummySeason = {
      id: '2021|Team1',
      year: '2021',
      rank: '2',
      playoffRank: '1',
      teamName: 'Team1',
      record: '7-0-3',
      pct: 0.08,
      streak: '4W',
      pointsFor: 1938.48,
      pointsAgainst: 1739.54
    }
  })

  it('should return list of seasons', () => {   
    service.getListSeasons().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummySeasons);
    })
    const req = httpMock.expectOne(service.endpoint + '/season');
    expect(req.request.method).toBe('GET');
    req.flush(dummySeasons);
  })

  it('should return list of season by year', () => {
    let year = '2021';
    service.getListSeasonsByYear(year).subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummySeasons);
      expect(data[0].year).toBe('2021');
    })
    const req = httpMock.expectOne(service.endpoint + '/season/?year=2021');
    expect(req.request.method).toBe('GET');
    req.flush(dummySeasons);
  })

  it('should return single season', () => {
    let id = 'Orlando Marca';
    service.getSingleSeason(id).subscribe(data => {
      expect(data).toBeTruthy();
    })
    const req = httpMock.expectOne(service.endpoint + '/season/' + id);
    expect(req.request.method).toBe('GET');
    req.flush(dummySeason);
  })

  it('should delete season', () => {
    let id = 'Orlando Marca';
    service.deleteSeason(id).subscribe(data =>{
      expect(data).toBeTruthy();
    })
    const req = httpMock.expectOne(service.endpoint + '/season/' + id);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummySeasons)
  })

  it('should add season', () => {
    service.addSeason(dummySeason).subscribe(data =>{
      expect(data).toBeTruthy
    })
    const req = httpMock.expectOne(service.endpoint + '/season');
    expect(req.request.method).toBe('POST');
    req.flush(dummySeason)
  })

});

