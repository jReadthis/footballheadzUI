import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesListComponent } from './components/games-list/games-list.component';

import { ManagersListComponent } from './components/managers-list/managers-list.component';
import { SeasonsListComponent } from './components/seasons-list/seasons-list.component';

const routes: Routes = [
  { path: 'manager', component: ManagersListComponent },
  { path: 'season', component: SeasonsListComponent },
  { path: 'game', component: GamesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
