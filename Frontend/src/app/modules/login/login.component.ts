import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  newUser: boolean = false;
  email: string = '';
  password: string = '';
  constructor(private accSrv: AccountService, private router: Router) {}

  ngOnInit(): void {}

  userLogin() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;
    this.accSrv
      .logIn({ email: email, password: password })
      .subscribe((res: any) => {
        localStorage.setItem('userName', res.name);
        localStorage.setItem('auth-token', res.token);
        this.router.navigate(['/board']);
      });
  }

  createUser() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement)
      .value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;
    const confirm = (document.getElementById('confirm') as HTMLInputElement)
      .value;
    this.accSrv
      .register({
        name: username,
        email: email,
        password: password,
        repeat_password: confirm,
      })
      .subscribe((res) => {
        this.accSrv
          .logIn({ email: email, password: password })
          .subscribe((success: any) => {
            localStorage.setItem('userName', success.name);
            localStorage.setItem('auth-token', success.token);
            this.router.navigate(['/board']);
          });
      });
  }
}
