import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signIn: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.signedIn$.subscribe((signIn) => {
      this.signIn = signIn
    })
    this.authService.checkAuth().subscribe(() => { });
  }
}
