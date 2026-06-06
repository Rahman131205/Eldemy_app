import { Component, NgZone } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { App as CapApp } from '@capacitor/app';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private platform: Platform,
    private zone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    GoogleAuth.initialize({
      clientId:
        '928122069790-jh6uvrfqqn6hq6mlj40isk3j5os0e993.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });

    // Global hardware back button handler for Android
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.zone.run(() => {
        const url = this.router.url;

        // Root/exit pages: exit the app
        const exitPages = [
          '/tabs/home',
          '/tabs/courses',
          '/tabs/history',
          '/tabs/profile',
          '/login',
          '/register',
          '/welcome',
          '/splash',
          '/privacy-policy'
        ];

        const shouldExit = exitPages.some(page => {
          if (page === '/privacy-policy') {
            // Only exit if it's the onboarding privacy policy (no query params check needed here,
            // the standalone route at root level is only used for onboarding)
            return url === '/privacy-policy' || url.startsWith('/privacy-policy?');
          }
          return url === page || url === page + '/' ;
        });

        if (shouldExit) {
          CapApp.exitApp();
        } else {
          // Sub-pages: navigate back properly
          this.navCtrl.back();
        }
      });
    });
  }
}
