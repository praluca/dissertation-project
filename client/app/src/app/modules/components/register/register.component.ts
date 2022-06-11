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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signinGroup!: FormGroup;
  statuses: any = ['Doctor', 'Pacient'];
  currentStatus: any = '';
  hide = true;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinGroup = this.fb.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[- +()0-9]+'),
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(6)]),
    });
  }

  onSubmit() {
    console.log('click', this.signinGroup);
    let user = {
      name: this.signinGroup.get('name')?.value,
      phone: this.signinGroup.get('phone')?.value,
      email: this.signinGroup.get('email')?.value,
      password: this.signinGroup.get('password')?.value,
      status: this.currentStatus,
    };
    console.log('click', user);
    this.apiService.registerUser(user).subscribe((response: any) => {
      console.log('response', response);
      this.localStorageService.set('x-auth-token', response.token);
      this.router.navigate(['/home']);
    });
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
  radioChange(event: any) {
    this.currentStatus = event.value;
    console.log('event', event);
  }
}
