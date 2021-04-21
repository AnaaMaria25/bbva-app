import { Component } from '@angular/core';
import { UserModel } from 'src/core/models/user.model';
import { AuthenticationService } from 'src/providers/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  /**
   * User who is logged in the App
   */
  public loggedUser: UserModel;

  /**
   * Last time the user accessed to the App. If it is the first time, it will be null
   */
  public lastTime: number;

  constructor(public authenticationService: AuthenticationService) { 
  this.loggedUser = this.authenticationService.getAuthenticatedUser();
  this.lastTime = this.loggedUser.lastTime ? this.loggedUser.lastTime : null;
  }

  /**
   * Performs the logout of the App
   */
  public logout() {
    this.authenticationService.logout();
    
  }
}
