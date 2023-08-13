import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, delay, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

    return of(null).pipe(
      mergeMap(() => {

        if (request.url.endsWith('/api/register') && request.method === 'POST') {
          const newUser = request.body;

          const duplicateUser = users.find((user: any) => user.email === newUser.email);
          if (duplicateUser) {
            return error('Email "' + newUser.email + '" is already registered');
          }

          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));

          return ok();
        }

        return next.handle(request);
      }),
      materialize(),
      delay(500),
      dematerialize()
    );
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendService,
  multi: true
};

function ok(body?: any) {
  return of(new HttpResponse({ status: 200, body }));
}

function error(message: any) {
  return of(new HttpResponse({ status: 400, body: { message } }));
}
