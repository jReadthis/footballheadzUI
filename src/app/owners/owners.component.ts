import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OwnerService } from '../owner.service';
import { Owner } from './owner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css'],
})
export class OwnersComponent implements OnInit {
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  owners: Array<Owner> = [];
  ownerGroup: any;
  ownerActive: boolean;
  teamActive: boolean;
  ownerActiveDate: any;
  teamActiveDate: any;

  constructor(private datePipe: DatePipe, private ownerService: OwnerService) {}

  ngOnInit() {
    this.ownerService.doGet();
    this.getOwners();
    this.ownerGroup = new FormGroup({
      ownerName: new FormControl(''),
      teamName: new FormControl(''),
      ownerActive: new FormControl(false),
      teamActive: new FormControl(false),
      ownerActiveDate: new FormControl(''),
      teamActiveDate: new FormControl(''),
    });
  }

  snackbar() {
    // Get the snackbar DIV
    const x = document.getElementById('snackbar');

    // Add the "show" class to DIV
    x.className = 'show';

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }

  getOwners() {
    this.ownerService.getOwners().subscribe((data) => {
      debugger;
      console.log(JSON.stringify(data));
      for (const owner of data as any) {
        console.log('Owner: ' + owner.OwnerName);
        this.owners.push(owner);
      }
      console.log('Owners: ' + this.owners);
    });
  }

  onSubmit() {
    // this.owner.OwnerName = this.ownerGroup.get('ownerName');
    // this.owner.TeamName = this.ownerGroup.get('teamName');
    const chosen = this.ownerGroup.controls['ownerActiveDate'].value;

    console.log(chosen);
    console.log(this.datePipe.transform(chosen, 'yyyy-MM-dd'));
    // 'OwnerName: ' +
    //   this.owner.OwnerName +
    //   ' ' +
    //   'Team Name: ' +
    //   this.owner.TeamName
  }
}
