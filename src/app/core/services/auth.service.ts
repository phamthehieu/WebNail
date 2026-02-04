import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";

/**
 * Lưu ý bảo mật: Token đang lưu localStorage — nếu XSS xảy ra, script có thể đọc token.
 * Khi có backend thật: nên dùng httpOnly cookie do server set (HttpOnly; Secure; SameSite).
 */
@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private _token = signal<string | null>(
        localStorage.getItem('token')
    );

    isLoggedIn = () => !!this._token();

    constructor(private router: Router) { }

    login(email: string, password: string) {
        if (email && password) {
            const fakeToken = 'token_123';
            localStorage.setItem('token', fakeToken);
            this._token.set(fakeToken);
            this.router.navigate(['/home']);
        }
    }

    logout() {
        localStorage.removeItem('token');
        this._token.set(null);
        this.router.navigate(['/home']);
    }

    get token() {
        return this._token();
    }
}