import { HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest,HttpEvent } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class appInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (!req.url.includes("/auth/login") ) {
      let newReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.authService.accessToken)
      });
      return next.handle(newReq);
    } else {
      return next.handle(req);
    }

  }
}
