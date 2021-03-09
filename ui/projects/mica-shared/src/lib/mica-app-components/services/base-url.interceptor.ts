import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(@Inject('ENVIRONMENT') private environment: any) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.environment.api != null) {
      req = req.clone({
        url: this.environment.api + req.url
      });
    }
    return next.handle(req);
  }
}
