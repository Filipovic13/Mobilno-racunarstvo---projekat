import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  //
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onLogIn(logInForm: NgForm) {
    if (logInForm.valid) {
      this.isLoading = true;
      this.authService.logIn(logInForm.value).subscribe(
        (responseData) => {
          console.log('Prijava uspesna');
          console.log(responseData);
          this.isLoading = false;
          this.router.navigateByUrl('/home/tabs/recipes-list');
        },
        (errRes) => {
          this.isLoading = false;
          let mess;
          const code = errRes.error.error.message;
          if (code === 'EMAIL_NOT_FOUND') {
            mess = 'Wrong email adress';
          } else if (code === 'INVALID_PASSWORD') {
            mess = 'Wrong password';
          }
          this.alertCtrl
            .create({
              header: 'Login failed',
              message: mess,
              buttons: ['Ok'],
            })
            .then((alert) => {
              alert.present();
            });
          logInForm.reset();
        }
      );
    }
  }
}
