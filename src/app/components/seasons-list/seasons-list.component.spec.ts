import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { SeasonCrudService } from 'src/app/service/season-crud.service';

import { SeasonsListComponent } from './seasons-list.component';
import data from '../../../assets/json/season.json';
import data2 from '../../../assets/json/season2.json';
import { Season } from 'src/model/season';

describe('SeasonsListComponent', () => {
  let component: SeasonsListComponent;
  let fixture: ComponentFixture<SeasonsListComponent>;
  let mockService: SeasonCrudService;
  let mockService2: SeasonCrudService;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj(['getListSeasons']).andReturn;
    TestBed.overrideProvider(SeasonCrudService, { useValue: mockService });
    await TestBed.configureTestingModule({
      declarations: [ SeasonsListComponent ],
      providers: [ DatePipe ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', inject([SeasonCrudService], (myService: SeasonCrudService) => {
    expect(component).toBeTruthy();
  }));

  beforeEach( inject([SeasonCrudService], (myService: SeasonCrudService) => {
      spyOn(myService, 'getListSeasons').and.returnValue(of(data));
      component.fetchSeasons();
  }));

  it('should call getListSeasons and return seasons', () => {
    expect(component.seasons.length).toEqual(3);
  });

  it('should call getListSeasons and return teamName', () => {
    expect(component.seasons[0].teamName).toEqual("Team1");
  })
  it('should call getListSeasons and return year', () => {
    expect(component.seasons[1].year).toEqual("2021");
  })
  it('should call getListSeasons and return id', () => {
    expect(component.seasons[1].id).toEqual("2021|Team2")
  })
  it('should call getListSeasons and return pct', () => {
    expect(component.seasons[0].pct).toEqual(0.08);
  })
  it('should call getListSeasons and return rank', () => {
    expect(component.seasons[1].rank).toEqual('1');
  })
  it('should call getListSeasons and return playoffRank', () => {
    expect(component.seasons[1].playoffRank).toEqual('2');
  })
  it('should call getListSeasons and return record', () => {
    expect(component.seasons[0].record).toEqual('7-0-3');
  })
  it('should call getListSeasons and return streak', () => {
    expect(component.seasons[0].streak).toEqual('4W');
  })
  it('should call getListSeasons and return pointsFor', () => {
    expect(component.seasons[1].pointsFor).toEqual(1938.48);
  })
  it('should call getListSeasons and return pointsAgainst', () => {
    expect(component.seasons[0].pointsAgainst).toEqual(1739.54);
  })
  it('should call selectYear and return 2021 season', () => {
    component.selectYear();
    expect(component.seasons[0].year).toEqual('2021');
  });
  it('should call sortSeasonsByRank and return sorted list', () => {
    const sortedSeasons = component.sortSeasonsByRank(component.seasons);
    expect(sortedSeasons[0].rank).toEqual('1');
    expect(sortedSeasons[1].rank).toEqual('2');
    expect(sortedSeasons[2].rank).toEqual('12');
  });
  it('should call sortSeasonsByPlayoffRank and return sorted list', () => {
    const sortedSeasons = component.sortSeasonsByPlayoffRank(component.seasons);
    expect(sortedSeasons[0].playoffRank).toEqual('1');
    expect(sortedSeasons[1].playoffRank).toEqual('2');
    expect(sortedSeasons[2].playoffRank).toEqual('11');
  });

  beforeEach( inject([SeasonCrudService], (myService: SeasonCrudService) => {
    spyOn(myService, 'getListSeasonsByYear').and.returnValue(of(data2));
    component.loadSeason('2021');
  }));
  it('should call getListSeasonsByYear and return seasons', () => {
    expect(component.seasons.length).toEqual(3);
  });
  it('should call getListSeasonsByYear and return 2021 season', () => {
    expect(component.seasons[0].year).toEqual('2021');
  });
  
});
