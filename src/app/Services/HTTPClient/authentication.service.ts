import {  inject } from '@angular/core';
import { ActivatedRouteSnapshot,  CanActivateFn,  RouterStateSnapshot } from '@angular/router';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router'
import { adfs_roles } from '../../StaticObjects/AdfsRoles';


export const IsRegistered: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	return true
}

export const canActivateAdministrator: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
	let jwtRole: string = inject(JwtService).GetRole((sessionStorage.getItem("jwt")||"").toString())
	let isAdmin: boolean= jwtRole === adfs_roles.adminrole
    if(isAdmin)
    {
        return true
    }
    else
    {
        inject(Router).navigate(["/"])
        return false
    }
  };

export const canActivateUser: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    if (inject(JwtService).GetRole((sessionStorage.getItem("jwt") || "").toString()) === adfs_roles.userrole) {
        return true
    }
    else {
        inject(Router).navigate(["/"])
        return false
    }
}

export const canActivateMfa: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let admin = inject(JwtService).GetRole((sessionStorage.getItem("jwt") || "").toString()) === adfs_roles.adminrole;
    let user = inject(JwtService).GetRole((sessionStorage.getItem("jwt") || "").toString()) === adfs_roles.userrole;
    if (user || admin) {
        return true
    }
    else {
        inject(Router).navigate(["/"])
        return false
    }
}

export const canActivateAdfs: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
{
    if (sessionStorage.getItem("jwt") === null && inject(JwtService).HasRole(sessionStorage.getItem("jwt") || "") === null)
    {
        return true
    }
    else {
        inject(Router).navigate(["/mfa"])
        return false
    }
}
