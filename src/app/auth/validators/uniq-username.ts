import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqUsername implements AsyncValidator {
    constructor(private http: HttpClient, private authService: AuthService) {
    }

    validate = (formControl: FormControl) => {
        const { value } = formControl;
        return this.authService.usernameAvailable(value)
            .pipe(
                map((value) => {
                    if (value.available) {
                        return null;
                    }
                }),
                catchError((err) => {
                    if (err.error.username) {
                        return of({ nonUniqUsername: true });
                    } else {
                        return of({ noConnection: true });
                    }
                })
            );
    }

}
