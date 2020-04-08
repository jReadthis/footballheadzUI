import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../owner.service';
import { Owner } from './owner';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css'],
})
export class OwnersComponent implements OnInit {
  owners: Array<Owner[]> = [];

  constructor(private ownerService: OwnerService) {}

  ngOnInit() {
    this.getOwners();
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
      console.log(JSON.stringify(data));
      for (const o of data.body as any) {
        this.owners.push(o);
      }
      console.log(this.owners);
    });
  }
}
