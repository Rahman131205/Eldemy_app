import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { GoogleAuthService } from '../services/google-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class RegisterPage implements OnInit {
  username = '';
  email = '';
  password = '';
  repeatPassword = '';
  showPassword = false;
  showRepeatPassword = false;

  constructor(
    private apiService: ApiService,
    private googleAuthService: GoogleAuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatPassword() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  doRegister() {
    if (!this.username || !this.email || !this.password) {
      alert('Mohon isi semua data!');
      return;
    }

    if (this.password !== this.repeatPassword) {
      alert('Kata sandi tidak sama!');
      return;
    }

    if (this.password.length < 6) {
      alert('Kata sandi minimal 6 karakter!');
      return;
    }

    this.apiService
      .register(this.username, this.email, this.password)
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            alert('Pendaftaran berhasil! Silakan masuk.');
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          alert('Gagal mendaftar. Email mungkin sudah digunakan.');
        },
      });
  }

  async registerWithGoogle() {
    try {
      const tokens = await this.googleAuthService.signIn();

      if (!tokens.accessToken && !tokens.idToken) {
        return;
      }

      this.apiService.googleLogin(tokens).subscribe({
        next: (res: any) => {
          if (res.success) {
            localStorage.setItem('token', res.access_token);
            this.router.navigate(['/tabs/home'], { replaceUrl: true });
          }
        },
        error: (err) => {
          console.error('Gagal daftar Google:', err);
        },
      });
    } catch (error: any) {
      console.error('Google Auth Error:', error);
    }
  }

  registerWithApple() {
    // TODO: Implementasi Apple Sign In
    alert('Fitur daftar dengan Apple akan segera tersedia.');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

