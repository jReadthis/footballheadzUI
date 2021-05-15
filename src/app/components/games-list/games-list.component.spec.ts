import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GameCrudService } from 'src/app/service/game-crud.service';
import data from '../../../assets/json/game.json';
import data2 from '../../../assets/json/head2head.json';

import { GamesListComponent } from './games-list.component';

describe('GamesListComponent', () => {
  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;
  let mockService = GameCrudService;
  let team1 = 'TheHogPit';
  let team2 = 'GimmyDaLoot';

  beforeEach(async () => {
    mockService = jasmine.createSpyObj(['getGames']).andReturn;
    TestBed.overrideProvider(GameCrudService, { useValue: mockService});
    await TestBed.configureTestingModule({
      declarations: [ GamesListComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', inject([GameCrudService], (myService: GameCrudService) => {
    expect(component).toBeTruthy();
  }));

  beforeEach( inject([GameCrudService], (myService: GameCrudService) => {
    spyOn(myService, 'getGames').and.returnValue(of(data));
      component.fetchGames();
    spyOn(myService, 'getHeadToHeadRecord').and.returnValue(of(data2));
      component.fetchHeadToHeadRecord(team1, team2);
  }))

  it('should call getGames and return 3 games', () => {
    expect(component.games.length).toEqual(10);
  });
  it('should call getGames and return game week', () => {
    expect(component.games[0].week).toEqual('15');
  })
  it('should call getGames and return homeTeam name', () => {
    expect(component.games[0].homeTeam).toEqual('GimmyDaLoot');
  })
  it('should call getGames and return awayTeam name', () => {
    expect(component.games[2].awayTeam).toContain('GimmyDaLoot');
  })
  it('should call getGames and return Manager with ActiveStatus is true', () => {
    expect(component.games[1].year).toEqual('2017');
  })
  it('should call fetchHeadToHeadRecord and return record', () => {
    expect(component.headtohead.record).toEqual('TheHogPit : 1 - GimmyDaLoot : 5');
  })
  it('should call fetchHeadToHeadRecord and return list of games', () => {
    expect(component.headtohead.games.length).toEqual(6);
  })
  it('should call fetchHeadToHeadRecord and return team1 name', () => {
    expect(component.headtohead.team1).toEqual(team1);
  })
  it('should call fetchHeadToHeadRecord and return team2 name', () => {
    expect(component.headtohead.team2).toEqual(team2);
  })

});
