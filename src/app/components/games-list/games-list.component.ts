import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { GameCrudService } from 'src/app/service/game-crud.service';
import { Game } from '../../../model/game';
import { HeadToHead } from '../../../model/head2head';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit, AfterViewInit {
  
  games!: Array<Game>;
  headtohead!: HeadToHead;
  gameGroup: any;
  head2headGroup: any;
  dataSource = new MatTableDataSource<Game>();
  displayedColumns: string[] = ['year', 'week', 'homeTeam', 'awayTeam', 'homeTeamPts', 'awayTeamPts'];
  
  constructor(public service: GameCrudService, public authService: AuthorizationService) { }

  @ViewChild('sort') sort!: MatSort;

  ngOnInit(): void {
    this.initGameGroup();
    this.initHead2HeadGroup();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  private initHead2HeadGroup() {
    this.head2headGroup = new FormGroup({
      team1: new FormControl(''),
      team2: new FormControl('')
    });
  }

  private initGameGroup() {
    this.gameGroup = new FormGroup({
      year: new FormControl(''),
      week: new FormControl(''),
      homeTeam: new FormControl(''),
      awayTeam: new FormControl(''),
      homeTeamPts: new FormControl(''),
      awayTeamPts: new FormControl('')
    });
  }

  fetchGames() {
    return this.service.getGames().subscribe((res: any) => {
      this.games = res;
    })
  }

  fetchHeadToHeadRecord(team1: string, team2: string) {
    return this.service.getHeadToHeadRecord(team1, team2).subscribe((res: any) => {
      this.headtohead = res;
      this.dataSource.data = this.headtohead ? this.headtohead.games : new Array<Game>();
    })
  }

  addGame(game: Game) {
    this.service.addGame(game).subscribe((game) => {
      this.gameGroup.reset()
    })
  }

  onSubmitHead2Head() {
    const team1 = this.head2headGroup.get('team1').value
    const team2 = this.head2headGroup.get('team2').value
    this.fetchHeadToHeadRecord(team1, team2)
  }

  onSubmit() {
    var game: Game = new Game();
    game.year = this.gameGroup.get('year').value
    game.week = this.gameGroup.get('week').value
    game.homeTeam = this.gameGroup.get('homeTeam').value
    game.awayTeam = this.gameGroup.get('awayTeam').value
    game.homeTeamPts = Number(this.gameGroup.get('homeTeamPts').value)
    game.awayTeamPts = Number(this.gameGroup.get('awayTeamPts').value)
    debugger
    this.addGame(game);
  }

  delete(id: string) {
    if(window.confirm('Really?')){
      this.service.deleteGame(id).subscribe(res => {

      })
    }
  }

}
