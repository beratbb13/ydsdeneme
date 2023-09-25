import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') !== null) {
      return true; // Kullanıcı oturumu varsa, rotaya erişime izin ver
    } else {
      // Kullanıcı oturumu yoksa, giriş yapılmasını yönlendir
      this.router.navigate(['/login']); // Giriş sayfasına yönlendir
      return false; // Rota erişime izin verilmez
    }
  }
}
