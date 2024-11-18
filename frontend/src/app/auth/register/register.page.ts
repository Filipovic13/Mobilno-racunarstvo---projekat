import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  onRegister() {
    this.loadingCtrl.create({ message: 'Registering...' }).then((loadingEl) => {
      loadingEl.present();

      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          loadingEl.dismiss();

          if (response.success) {
            this.router.navigateByUrl('/home');
          } else {
            this.showAlert(
              response.message || 'Registration failed. Please try again.'
            );
          }
        },
        () => {
          loadingEl.dismiss();
          this.showAlert('An error occurred. Please try again.');
        }
      );
    });
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Registration failed',
        message,
        buttons: ['OK'],
      })
      .then((alert) => alert.present());
  }
  // constructor(
  //   private authService: AuthService,
  //   private loadingCtrl: LoadingController,
  //   private router: Router
  // ) {}

  // ngOnInit() {
  //   this.registerForm = new FormGroup({
  //     username: new FormControl(null, Validators.required),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       //Validators.minLength(7),
  //     ]),
  //   });
  // }

  // onRegister() {
  //   this.loadingCtrl.create({ message: 'Registering...' }).then((loadingEl) => {
  //     loadingEl.present();

  //     this.authService
  //       .register(this.registerForm.value)
  //       .subscribe((responseData) => {
  //         console.log('Registracija uspela');
  //         console.log(responseData);

  //         loadingEl.dismiss();
  //         this.router.navigateByUrl('/home');
  //       });
  //   });
  //   //console.log(this.registerForm);
  // }
}
