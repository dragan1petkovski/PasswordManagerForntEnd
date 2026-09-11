import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Router } from "@angular/router";
import { event } from "jquery";
import { catchError, Observable, tap, throwError } from "rxjs";

export function UnauthorizedIntercepror(req: HttpRequest<unknown>, next: HttpHandlerFn) : Observable<HttpEvent<unknown>> {
	const router = Inject(Router)

	return next(req).pipe(

		catchError((er: HttpErrorResponse) => {
				if (er.status === 401)
				{
					sessionStorage.clear()
					router.navigate([""])
					return throwError(() => `Unauthorized Access ${er.url}`)
				}
				else if(er.status === 403)
				{
					sessionStorage.clear()
					router.navigate([""])
					return throwError(() => `Access Denied to ${er.url}`)
				}
				else{
                    console.log(`This is potential issue ${er}`)
					return throwError(() => er)
				}
		})
	)
}
