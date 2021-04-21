import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/providers/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  /**
   * Form to be filled to register
   */
  public form: FormGroup;

  constructor(public authenticationService: AuthenticationService, private router: Router,   private _snackBar: MatSnackBar) {
    this.form = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  /**
   * Performs the register. 
   * If OK, it shows a green snackbar and navigates to Login
   * If KO, it shows a red snackbar
   */
  public register() {
    if (this.authenticationService.register(this.form.value)) {
      this.router.navigate(['/login']);
      this._snackBar.open('Register done!', '', {
        duration: 2000,
        panelClass: ['snackbar-success']
      });
    } else {
      this._snackBar.open('Could not register!', '', {
        duration: 2000,
        panelClass: ['snackbar-error']
      });
    }
  }
}
