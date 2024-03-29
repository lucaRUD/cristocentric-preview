import { Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent {
  title = 'clock-greets';
  time!: Date;
  hours!: number;
  msg!: string;
  link!: string;
  constructor() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.decide();
  }

  decide() {
    this.hours = new Date().getHours();
    console.log('this.hours', this.hours);
    if (this.hours < 10) {
      this.msg = 'Good Morning';
      this.link = 'wwww.google.com';
      console.log('selamat Pagi');
    } else if (this.hours < 16) {
      this.msg = 'Good Afternoon';
      this.link = 'wwww.tokopedia.com';
      console.log('selamat siang');
    } else if (this.hours < 19) {
      this.msg = 'Good Evening';
    } else if (this.hours < 24) {
      this.msg = 'Good Night';
      this.link = 'wwww.sprout.co.id';
      console.log('selamat malam');
    } else if (this.hours < 6) {
      this.msg = 'Sleep lah';
      this.link = 'www.mangabat.com';
      console.log('selamat subuh');
    }
  }

  firebaseSusbscribing() {}
}
