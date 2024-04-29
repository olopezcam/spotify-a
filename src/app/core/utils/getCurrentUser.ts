import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const currentUser = (): { [key: string]: string } => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('token') as string;
  return { email: 'email@email.com', id: '1', role: 'admin', token };
};
