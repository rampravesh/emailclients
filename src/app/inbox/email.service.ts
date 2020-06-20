import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from './email';


interface EmailSummary {
  id: string,
  subject: string,
  from: string
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseUrl = "https://api.angular-email.com"

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.baseUrl}/emails`)
  }

  getEmail(id) {
    return this.http.get<Email>(`${this.baseUrl}/emails/${id}`)
  }

  sendEmail(email: Email) {
    return this.http.post(`${this.baseUrl}/emails`, email)
  }
}
