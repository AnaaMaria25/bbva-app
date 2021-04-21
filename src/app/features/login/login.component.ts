import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/providers/services/authentication/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  /**
   * Form to be filled to log in
   */
  public form: FormGroup;

  constructor(public authenticationService: AuthenticationService, public router: Router,
    private _snackBar: MatSnackBar) {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  /**
   * Performs the login. 
   * If OK, it shows a green snackbar and navigates to Home
   * If KO, it shows a red snackbar
   */
  public login() {
    if (this.authenticationService.login(this.form.value)) {
      this._snackBar.open('Login done!', '', {
        duration: 2000,
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/home'])
    } else {
      this._snackBar.open('Could not login!', '', {
        duration: 2000,
        panelClass: ['snackbar-error']
      });
    }
  }
}
