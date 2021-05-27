import { Component, OnInit, ViewChild } from '@angular/core';
import { SeasonCrudService } from "../../service/season-crud.service";
import { Season } from '../../../model/season';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthorizationService } from 'src/app/service/authorization.service';


@Component({
  selector: 'app-seasons-list',
  templateUrl: './seasons-list.component.html',
  styleUrls: ['./seasons-list.component.scss']
})
export class SeasonsListComponent implements OnInit, AfterViewInit {

  seasons!: Array<Season>
  dataSource = new MatTableDataSource<Season>();
  playoffDataSource = new MatTableDataSource<Season>();
  displayedColumns: string[] = ['rank', 'teamName', 'record', 'pct', 'streak', 'pointsFor', 'pointsAgainst'];
  displayedColumns2: string[] = ['playoffRank', 'teamName']
  selectedYear!: string
  years: string[] = ['2020','2019','2018','2017','2016','2015','2014','2013','2012','2011'];
  seasonGroup: any;

  constructor(public seasonCrudService:SeasonCrudService, public authService: AuthorizationService ) { }

  ngOnInit(): void {
    this.selectedYear = this.years[0];
    this.loadSeason(this.selectedYear);
    this.seasonGroup = new FormGroup({
      teamName: new FormControl(''),
      id: new FormControl(''),
      year: new FormControl(''),
      rank: new FormControl(''),
      playoffRank: new FormControl(''),
      record: new FormControl(''),
      pct: new FormControl(''),
      streak: new FormControl(''),
      pointsFor: new FormControl(''),
      pointsAgainst: new FormControl(''),
      teamsFormControl: new FormControl('')
      
    });
  }

  @ViewChild('sort') sort!: MatSort; 
  @ViewChild('sort2') sort2!: MatSort;


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.playoffDataSource.sort = this.sort2;
  }

  fetchSeasons() {
    return this.seasonCrudService.getListSeasons().subscribe((res: any) => {
      this.seasons = res;
    })
  }

  loadSeason(year: string) {
    this.seasonCrudService.getListSeasonsByYear(year).subscribe((res:any) => {
      this.seasons = res
      this.dataSource.data = this.sortSeasonsByRank(this.seasons);
      this.playoffDataSource.data = this.sortSeasonsByPlayoffRank(this.seasons);
    });
  }    

  fetchListOfSeasons() {
  }
  
  selectYear() {
    this.loadSeason(this.selectedYear)
  }

  onSubmit() {    
    var season: Season = new Season();
    season.teamName = this.seasonGroup.get('teamName').value
    season.id = this.seasonGroup.get('id').value
    season.year = this.seasonGroup.get('year').value
    season.rank = this.seasonGroup.get('rank').value
    season.playoffRank = this.seasonGroup.get('playoffRank').value
    season.record = this.seasonGroup.get('record').value
    season.pct = Number(this.seasonGroup.get('pct').value)
    season.streak = this.seasonGroup.get('streak').value
    season.pointsFor = Number(this.seasonGroup.get('pointsFor').value)
    season.pointsAgainst = Number(this.seasonGroup.get('pointsAgainst').value)
  
    this.seasonCrudService.addSeason(season).subscribe((season) => {
      this.seasonGroup.reset()
    });
  }

  sortSeasonsByRank(seasons: Array<Season>) {
    return seasons ? seasons.sort((a,b) => parseInt(a.rank) - parseInt(b.rank)) : seasons
  }

  sortSeasonsByPlayoffRank(seasons: Array<Season>) {
    return seasons ? seasons.sort((a,b) => parseInt(a.playoffRank) - parseInt(b.playoffRank)) : seasons
  }
}