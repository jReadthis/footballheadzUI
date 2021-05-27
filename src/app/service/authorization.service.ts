import { Injectable } from '@angular/core';
import { Amplify } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';
import { CognitoUser, ISignUpResult } from 'amazon-cognito-identity-js'
import { Router } from '@angular/router';

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

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  user: any;

  signUpResult!: ISignUpResult

  login(item: any): Promise<CognitoUser>{
    return Auth.signIn(item.UserId, item.Password)
  }

  logout(): Promise<any> {
    return Auth.signOut()
  }

  isLoggedIn(): boolean { 
    if (this.user != null) {
      return true
    } else {
      return false
    }
  }

  getAuthenticatedUser(): any {
    console.log('auth call')
    // gets the current user from the local storage
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
      console.log(user)
      this.signUpResult = user
      console.log(this.signUpResult)
      return user;
    }).catch(err => console.log(err))
    return null
  }

}
