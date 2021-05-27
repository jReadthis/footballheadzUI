import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/service/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'footballheadzUI';

  constructor(public authService: AuthorizationService, public router: Router) { }

  ngOnInit(): void {}

  logout(): boolean {
    debugger
    if(this.authService.isLoggedIn()) {
      this.authService.logout().then(data => {
        this.authService.user = null;
        this.router.navigate(['/']);
      }).catch(err => {
        console.log(err)
      })
    }
    return false
  }

}
