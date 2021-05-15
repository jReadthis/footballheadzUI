import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManagerCrudService } from "../../service/manager-crud.service";
import { Manager } from '../../../model/manager';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.scss']
})
export class ManagersListComponent implements OnInit {

  managers!: Array<Manager>;
  options!: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  managerGroup: any;
  managerActive!: boolean;
  managerActiveDate: any;
  teams!: Array<String>;

  constructor(public managerCrudService: ManagerCrudService, 
    private datePipe: DatePipe, private dateAdapter: DateAdapter<Date>) {
      
     }

  ngOnInit(): void {
    this.fetchManagers();
    this.managerGroup = new FormGroup({
      managerName: new FormControl(''),
      managerActive: new FormControl(false),
      managerActiveDate: new FormControl(''),
      teamsFormControl: new FormControl('')
    });
  }

  snackbar() {
    // Get the snackbar DIV
    const x = document.getElementById('snackbar');

    // Add the "show" class to DIV
    if(x != null){
      x.className = 'show';
    }

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      if (x != null) {
        x.className = x.className.replace('show', '');
      }
    }, 3000);
  }

  fetchManagers() {
    return this.managerCrudService.getUsers().subscribe((res: any) => {
      this.managers = res;
    })
  }

  delete(managerName: string) {
    this.snackbar();
    console.debug(managerName);
    if (window.confirm('Really?')){
      this.managerCrudService.deleteUser(managerName).subscribe(res => {
        this.fetchManagers()
      })
    }
  }

  onSubmit() {    
    var manager: Manager = new Manager();
    var date: Date = this.managerGroup.controls['managerActiveDate'].value
    manager.managerName = this.managerGroup.get('managerName').value
    manager.activeDate = date
    manager.activeStatus = this.managerGroup.get('managerActive').value.toString()
    manager.teams = this.addTeam(this.managerGroup.get('teamsFormControl').value)
  
    this.managerCrudService.addUser(manager).subscribe((manager) => {
      this.fetchManagers();
      this.managerGroup.reset()
      this.teams = []
    });
  }

  private addTeam(team: String) {
    if (this.teams == null) {
      this.teams = new Array
    }
    this.teams.push(team)
    return this.teams;
  }

  addNewTeam() {
    var teamName = this.managerGroup.get('teamsFormControl').value;
    if (typeof teamName!='undefined' && teamName) {
      if (this.teams == null) {
        this.teams = new Array
      }
      this.teams.push(teamName);
      this.managerGroup.get('teamsFormControl').reset()
    }
  }

  parseDate(date: any){ 
    return this.datePipe.transform(date, 'longDate');
  }

}
