import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Add import statement for HttpClient
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient, private cookie: CookieService) {} // Specify the type of httpClient as HttpClient

  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    };
    return this.http.post(`${this.URL}/auth/login`, body).pipe(
      tap((response: any) => {
        const { tokenSession, data } = response;
        this.cookie.set('token_service', tokenSession, 4, '/');
      })
    );
  }
}
