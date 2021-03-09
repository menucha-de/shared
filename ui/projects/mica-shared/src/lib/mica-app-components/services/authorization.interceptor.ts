import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(@Inject('ENVIRONMENT') private environment: any) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.environment.production && this.environment.credentials) {
      req = req.clone({
        setHeaders: {
          Authorization: this.environment.credentials
        }
      });
    }
    return next.handle(req);
  }
}
