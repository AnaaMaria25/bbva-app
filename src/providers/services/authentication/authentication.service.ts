import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { UserModel } from "src/core/models/user.model";

@Injectable()
export class AuthenticationService {

  /**
   * The local storage where the data is stored
   */
  private localStorageService;
  /**
   * Thhe users who are registered in the App
   */
  private users: Array<UserModel>;
  /**
   * The user who is logged in
   */
  private authenticatedUser: UserModel;;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.users = this.localStorageService.getItem('users') ? JSON.parse(this.localStorageService.getItem('users')) : [];
    this.authenticatedUser = this.localStorageService.getItem('loggedUser') ?
      JSON.parse(this.localStorageService.getItem('loggedUser')) : null;
  }

  /**
   * Performs the register if the user who wants to be registered has got an email which is not contained in
   * the array of registered users
   * @param registerUser the user who wants to be registered
   * @returns true if the register process is performed with success, false if not
   */
  public register(registerUser: UserModel): boolean {
    if (this.users.find(user => user.email === registerUser.email)) {
      return false;
    } else {
      this.users.push(registerUser);
      this.localStorageService.setItem('users', JSON.stringify(this.users));
      return true;
    }
  }

  /**
   * Performs the log in if the array of registered users contains the user who wants to log in
   * If this array contains it, the logged user is stored in the local storage
   * @param loggedUser the user who wants to log in
   * @returns true if the log in process is performed with success, false if not
   */
  public login(loggedUser: UserModel): boolean {
    const user: UserModel = this.users.find(user => user.email === loggedUser.email && user.password === loggedUser.password);
    if (user) {
      this.authenticatedUser = user;
      this.localStorageService.setItem('loggedUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  /**
   * Saves the last time the user accessed to the App (current date)
   * Removes the logged user from the local storage and navigates to Login Page
   */
  public logout(): void {
    const users = this.users.map(user => user.email === this.authenticatedUser.email ? { ...user, lastTime: new Date().getTime() } : user);
    this.users = users;
    this.localStorageService.setItem('users', JSON.stringify(this.users));
    this.localStorageService.removeItem('loggedUser');
    this.authenticatedUser = null;
    this.router.navigate(['/login']);
  }

  /**
   * Returns the logged user
   * @returns the logged user
   */
  public getAuthenticatedUser(): UserModel {
    return this.authenticatedUser;
  }

}
