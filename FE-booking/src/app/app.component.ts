import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authService.service';
import { LoadingService } from './services/loading.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'graduation-project';
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public loadingService:LoadingService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authService.isLoggedIn$.next(true);
    }

    // scroll to the top when the route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
}
