import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {FormContentTypeIntercepror} from './Services/HTTPClient/FormContentTypeIntercepror';
import { routes } from './app.routes';


import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthenticationIntercepror } from './Services/HTTPClient/AuthenticationInterceptor';
import { UnauthorizedIntercepror } from './Services/HTTPClient/UnauthorizedInterceptor';
import {JsonContentTypeInterceptor} from './Services/HTTPClient/JsonContentTypeInterceptor';

//To enable httpClient on server site with fetch i need the following configuration

//import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
//export const appConfig: ApplicationConfig = {
//  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch()),importProvidersFrom(HttpClientModule)]
//};




export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()),provideHttpClient(withFetch(),withInterceptors([FormContentTypeIntercepror,AuthenticationIntercepror,JsonContentTypeInterceptor])),importProvidersFrom(OAuthModule.forRoot()), provideAnimationsAsync()]
};
