import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
// import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  model: any = {}
  content: object = {}
  result: any = {}
  check = false;
  ngOnInit() {}

  constructor(
    private formBuilder: FormBuilder,
    private serverHttp: ServiceService,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  clickSubmit() {
    this.check = true;
    const params = {
      username: this.model.user,
      password: this.model.password
    }
    if (this.formLogin.valid) {
      this.serverHttp.login(params).subscribe(res => {
        if (res) {
          this.result = res
          if (this.result.detail === 'success') {
            this.router.navigate(['/account']);
            alert('Đăng nhập thành công')
          } else {
            alert('Đăng nhập không thành công')
          }
        }
      })
    }
  }
}
