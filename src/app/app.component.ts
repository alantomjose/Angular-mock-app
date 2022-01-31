import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedFeature: string = 'recipie';
  title = 'udemy-recipie-app';
  constructor(private authService: AuthService) {}

  onNavigate(feature) {
    console.log(feature);
    this.loadedFeature = feature;
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
}
