import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqUsername } from '../validators/uniq-username';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20),
    Validators.pattern(/^[a-z0-9]+$/)], [this.uniqUsername.validate]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  }, { validators: [this.matchPassword.validate] });

  constructor(private matchPassword: MatchPassword, private uniqUsername: UniqUsername, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signUp(this.authForm.value)
      .subscribe((res) => console.log(res),
        (err) => {
          console.log(err);
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true })
          } else {
            this.authForm.setErrors({ unknownError: true })
          }
        }
      );


  }
}
