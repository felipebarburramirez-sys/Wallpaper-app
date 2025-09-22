import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Token as TokenService } from '../../../core/storage/token/token';
import { Auth as AuthService } from '../../../data/firebase/auth/auth';

import { User } from '../../../data/firebase/user/entity/user.entity';

@Injectable({
  providedIn: 'root',
})
export class Auth implements CanActivate {
  public constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  public async canActivate(): Promise<boolean> {
    const user: User | undefined = this.authService.getUser();

    if (user) return true;

    return this.validate(await this.tokenService.init());

  }

  private validate(hasInited: boolean): boolean {
    if (!hasInited) this.router.navigate(['/home']);

    return hasInited;
  }
}
