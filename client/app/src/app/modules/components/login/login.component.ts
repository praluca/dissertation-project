import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signinGroup!: FormGroup;

  hide = true;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinGroup = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(6)]),
    });
  }

  onSubmit() {
    console.log('click', this.signinGroup);
    let user = {
      email: this.signinGroup.get('email')?.value,
      password: this.signinGroup.get('password')?.value,
    };
    console.log('click', user);
    this.apiService.loginUser(user).subscribe((response: any) => {
      console.log('response', response);
      this.localStorageService.set('x-auth-token', response.token);
      this.router.navigate(['/home']);
    });
  }
  onRedirectToRegister() {
    this.router.navigate(['/register']);
  }
}
