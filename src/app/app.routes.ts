import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule } from '@angular/router';
import { canActivateAdministrator, canActivateUser} from './Services/HTTPClient/authentication.service';
import { LoginComponent } from './Components/Login/LoginPage/login.component';

export const routes: Routes = [
    //Position of the route is very important, MOST SPECIFIC FIRST
	//providers:[provideHttpClient([])] -> Add Authentication HttpInterceptor to add Authentication header
	{path: "admin", canActivate:[canActivateAdministrator], loadChildren: () => import("./Components/Admin/AdminRoutes").then(m => m.Admin_routes),},
	{path: "home", canActivate:[canActivateUser], loadChildren: () => import("./Components/Home/HomeRoutes").then(m => m.Home_routes)},
    {path: "adfs/code", loadComponent: () => import("./Components/Login/Adfs/AdfsCode.Component").then(m => m.AdfsCodeComponent)},
    {path: "", component: LoginComponent},
    {path: "**", redirectTo: ''}
];


// export const routing = RouterModule.forRoot(routes);
const routerOptions: ExtraOptions = {
	onSameUrlNavigation: 'reload'
  };
  
//   @NgModule({
// 	imports: [RouterModule.forRoot(routes, routerOptions)],
// 	exports: [RouterModule]
//   })

  @NgModule({
	imports: [RouterModule],
	exports: [RouterModule]
  })
  export class AppRoutingModule { }
