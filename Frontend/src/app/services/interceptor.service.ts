import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('api/user/login') || req.url.endsWith('api/user/register')) {
      return next.handle(req);
    }
    const at = localStorage.getItem('auth-token') || null;
    if (!at) return EMPTY;
    if (!req.headers.has('auth-token')) {
      req = req.clone({headers: req.headers.set('auth-token', at)});
    }
    return next.handle(req);
  }
}
