import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/providers/services/authentication/authentication.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {

  /**
   * Time to be subtracted from the current date to calculate the elapsed time
   */
  @Input()
  time: number;

  /**
   * ID of the interval to clear it when the component is destroyed
   */
  public intervalID;
  /**
   * Current Date
   */
  public date: number;
  /**
   * Days to be shown
   */
  public days: string;
  /**
   * Hours to be shown
   */
  public hours: string;
  /**
   * Minutes to be shown
   */
  public minutes: string;
  /**
   * Seconds to be shown
   */
  public seconds: string;

  constructor(public authenticationService: AuthenticationService, public router: Router) {
    this.date = new Date().getTime();
  }

  /**
   * Sets an interval to update the current date each second
   */
  ngOnInit(): void {
    if (this.time) {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    }
  }

  /**
   * Calculates the elapsed time between the given date and the current date
   */
  public tick() {
    const millisecondsOfASecond = 1000;
    const millisecondsOfAMinute = 60 * millisecondsOfASecond;
    const millisecondsOfAnHour = 60 * millisecondsOfAMinute;
    const millisecondsOfADay = 24 * millisecondsOfAnHour;
    this.date = new Date().getTime();
    const ms = this.date - this.time;
    this.days = this.formatTime(Math.floor(ms / millisecondsOfADay));
    const daysRemainder = ms % millisecondsOfADay;
    this.hours = this.formatTime(Math.floor(daysRemainder / millisecondsOfAnHour));
    const hoursRemainder = ms % millisecondsOfAnHour;
    this.minutes = this.formatTime(Math.floor(hoursRemainder / millisecondsOfAMinute));
    const minutesRemainder = ms % millisecondsOfAMinute;
    this.seconds = this.formatTime(Math.floor(minutesRemainder / millisecondsOfASecond));
  }

  /**
   * Formats the elapsed time to be shown
   * @param time the time elapsed as a number
   * @returns the formatted time as a string with an additional 0 if needed
   */
  public formatTime(time: number): string {
    return time < 10 ? '0'.concat(time.toString()) : time.toString()
  }

  /**
   * Clear the interval
   */
  ngOnDestroy(): void {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }
}
