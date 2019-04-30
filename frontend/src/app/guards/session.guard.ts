import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.validateRoute(next['routeConfig'].path);
  }
  constructor(public router: Router) { }

  validateSession() {
    return sessionStorage.getItem('token');
  }

  validateRoute(route: string): boolean {
    const userToken = this.validateSession();
    let response = true;
    if (route === 'login') { 
      sessionStorage.clear() 
    } else if(!userToken) {
      response = this.navigateToLogin();
    }
    return response;
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
    return false;
  }
}
