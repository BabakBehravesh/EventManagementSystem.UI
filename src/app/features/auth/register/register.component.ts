import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  loading = false;
  selectedRoles: number[] = [];
  showRolesError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onRoleChange(event: any, roleValue: number): void {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (!this.selectedRoles.includes(roleValue)) {
        this.selectedRoles.push(roleValue);
      }
    } else {
      const index = this.selectedRoles.indexOf(roleValue);
      if (index > -1) {
        this.selectedRoles.splice(index, 1);
      }
    }

    this.selectedRoles.sort();

    this.showRolesError = this.selectedRoles.length === 0;
  }

  onSubmit(): void {
    if (this.selectedRoles.length === 0) {
      this.showRolesError = true;
      return;
    }

    if (this.registerForm.valid) {
      this.loading = true;
      const { email, password } = this.registerForm.value;

      const registerData = {
        email: email,
        password: password,
        userRoles: this.selectedRoles
      };

      this.authService.register(registerData).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Registration failed';
          this.loading = false;
        }
      });
    }
  }
}