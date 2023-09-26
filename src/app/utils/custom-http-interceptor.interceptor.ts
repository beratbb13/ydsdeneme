import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/authService/auth.service';
import { ToastService } from '../services/toastService/toast.service';

@Injectable()
export class CustomHttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private toastService: ToastService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var token = this.authService.getToken();
    var requestURL = request.url
    if (requestURL == "/assets/i18n/en.json" || requestURL == "/assets/i18n/tr.json") {

    }
    else {
      request = request.clone({
        url: `${request.url}`,
        setHeaders: {
          //'Content-Type': 'application/json',
          //Authorization: `Bearer ${token}`
        }
      });
    }


    //return next.handle(request);

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (!(event instanceof HttpResponse)) {
            return;
          }
          console.log(event.body.result, event.body.messageId);

          if (event.body.result === true && event.body.messageId !== 0) {
            this.toastService.showToast('success', event.body.message);

          }

          if (event.body.result === false) {
            let error = new Error()
            error.name = "ServerError";
            error.message = event.body.message;
            error.stack = event.body.messageId.toString();
            throw error;
          }
        },
        (error: Error) => {
          // hide spinner
          //this.spinner.hide();
        }
      )
    );
  }
}
