import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authorizationInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const cookieService = inject(CookieService);
  try {
    const token = cookieService.get('token');
    let newRequest = request;
    newRequest = request.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
        CUSTOM_HEADER: 'custom header value',
      },
    });
    return next(newRequest);
  } catch (error) {
    console.log('Error en el interceptor', error);
    return next(request);
  }
};
