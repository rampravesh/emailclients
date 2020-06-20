import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email;


  constructor(private authService: AuthService, private emailService: EmailService) {
    this.email = {
      id: '', to: '', subject: '', text: '', html: '', from: `${authService.username}@angular-email.com`
    }
  }

  ngOnInit(): void {
  }

  onSubmit(value: Email) {
    this.emailService.sendEmail(value).subscribe((res) => {
      console.log(res);
      this.showModal = false;
    });
  }
}
