import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
    login: boolean;

    constructor(private http: HttpClient, private router: Router) { }
  
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (event.url != "/login" && event.url != "/" && !event.url.includes("/sign-up")) {
            if (sessionStorage.getItem("tokenNo") === null || sessionStorage.getItem("tokenNo") === undefined || sessionStorage.getItem("tokenNo") === 'null' || sessionStorage.getItem("tokenNo") === "") {
              this.router.navigate(['/login']);
            }
          }
        }
      });
      let tokenNo = sessionStorage.getItem("tokenNo");
      if (tokenNo != null && tokenNo != undefined && tokenNo != "" && tokenNo != "null") {
        request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${tokenNo}`
          }
      });
      }
      console.log(request,"token");
      
      return next.handle(request);
    }
  
}
