import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    message: string;
}

export interface DecodedToken {
    email?: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = environment.apiUrl;
    private jwtHelper = new JwtHelperService();
    private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));

    public token$ = this.tokenSubject.asObservable();

    constructor(private http: HttpClient) { }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
            .pipe(tap(response => {
                localStorage.setItem('token', response.token);
                this.tokenSubject.next(response.token);
            }));
    }

    register(userData: RegisterRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/register`, userData);
    }

    logout(): void {
        localStorage.removeItem('token');
        this.tokenSubject.next(null);
    }

    getToken(): string | null {
        return this.tokenSubject.value;
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    getUserRoles(): string[] {
        const token = this.getToken();
        if (!token) return [];

        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.role || [];
    }

    getUserEmail(): string | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            return decoded.email || null;
        }
        catch {
            return null;
        }
    }

    isEventCreator(): boolean {
        return this.getUserRoles().includes('EventCreator');
    }

    isEventParticipant(): boolean {
        return this.getUserRoles().includes('EventParticipant');
    }
}