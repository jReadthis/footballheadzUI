import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Game } from 'src/model/game';
import { HeadToHead } from 'src/model/head2head';

import { GameCrudService } from './game-crud.service';

describe('GameCrudService', () => {
  let service: GameCrudService;
  let httpMock: HttpTestingController;
  let dummyGames: Game[];
  let dummyGame: Game;
  let dummyHead2Head: HeadToHead;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ GameCrudService ]
    });
  });

  beforeEach(inject(
    [HttpTestingController, GameCrudService],
    (http: HttpTestingController, gameService: GameCrudService) => {
      httpMock = http;
      service = gameService;
    }
  ));

  afterEach(inject([HttpTestingController], (http: HttpTestingController) => {
    http.verify();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  beforeEach(() => {
    dummyGames = [{
      id:'id1',
      year: '2020',
      week: '2',
      homeTeam: 'team1',
      awayTeam: 'team2',
      homeTeamPts: 99.67,
      awayTeamPts: 76.34
    },{
      id: 'id2',
      year: '2020',
      week: '12',
      homeTeam: 'team1',
      awayTeam: 'team2',
      homeTeamPts: 96.47,
      awayTeamPts: 101.64
    }];

    dummyGame = {
      id: 'id3',
      year: '2020',
      week: '10',
      homeTeam: 'team1',
      awayTeam: 'team2',
      homeTeamPts: 91.68,
      awayTeamPts: 109.48
    };

    dummyHead2Head = {
      team1: 'team1',
      team2: 'team2',
      record: 'team1 : 1 - team2 : 2',
      games: dummyGames
    }
  })

  it('should return list of games', () => {   
    service.getGames().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyGames);
    })
    const req = httpMock.expectOne(service.endpoint + '/game');
    expect(req.request.method).toBe('GET');
    req.flush(dummyGames);
  })

  it('should return head to head record of teams', () => {
    let team1 = 'team1'
    let team2 = 'team2'
    service.getHeadToHeadRecord(team1, team2).subscribe(data => {
      expect(data.record).toBe('team1 : 1 - team2 : 2');
      expect(data.team1).toBe('team1');
      expect(data.team2).toBe('team2');
      expect(data.games.length).toBe(2);
    })
    const req = httpMock.expectOne(service.endpoint + '/game/head2head?teamName='+ team1 + ',' + team2);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHead2Head);
  })

  it('should return single game', () => {
    let id = 'gameId';
    service.getGame(id).subscribe(data => {
      expect(data).toBeTruthy();
    })
    const req = httpMock.expectOne(service.endpoint + '/game/' + id);
    expect(req.request.method).toBe('GET');
    req.flush(dummyGame);
  })

  it('should delete game', () => {
    let gameID = '';
    service.deleteGame(gameID).subscribe(data =>{
      expect(data).toBeTruthy();
    })
    const req = httpMock.expectOne(service.endpoint + '/game/' + gameID);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyGames)
  })

  it('should add game', () => {
    service.addGame(dummyGame).subscribe(data =>{
      expect(data).toBeTruthy
    })
    const req = httpMock.expectOne(service.endpoint + '/game');
    expect(req.request.method).toBe('POST');
    req.flush(dummyGame)
  })

});

