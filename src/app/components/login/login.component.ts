import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Amplify } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginInterface } from 'src/model/LoginInterface'
import { AuthorizationService } from 'src/app/service/authorization.service';

Amplify.configure({
  Auth: {

    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    //identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
    // Required only if it's different from Amazon Cognito Region
    //identityPoolRegion: 'XX-XXXX-X',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_xOkOaFyrY',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: 'm6l34u1qog6pc8ou76ppv6a9m',
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
});

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailVerificationMessage: boolean = false;

  newPassword!: string

  item: LoginInterface = {
    UserId: '',
    Password: ''
  }

  currentConfig = Auth.configure();
  user: any

  constructor(private router: Router, private loginService: AuthorizationService) { }

  ngOnInit() {
  
  }

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    
    this.item.UserId= email
    this.item.Password = password
    
    this.login()
  }

  login() {
    debugger
    this.loginService.login(this.item).then( (user: any) => {
      if(user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        this.router.navigate(['/game']);
      } else {
        this.loginService.user = user;
        console.log(this.loginService.user)
        this.router.navigate(['/']);
      }
    }).catch(err => {
      console.log(err)
    });
  }

  changePassword() {
    Auth.changePassword(this.item.UserId, this.item.Password, this.newPassword).then(user =>{
      this.router.navigate(['']);
      console.log(user)
    }).catch(err => {
      console.log(err)
    })
  }
}
