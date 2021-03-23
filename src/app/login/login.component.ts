import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service'
// import { AccountComponent} from '../account/account.component'
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';


// const routes: Routes = [
//   {
//     path: 'account',
//     component: AccountComponent,
//   }
// ];
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  model: any = {}
  content: object = {}
  result: any

  constructor(
    private formBuilder: FormBuilder,
    private serverHttp: ServiceService,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      user: ['', [Validators.required, Validators.maxLength(250)]],
      password: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  clickSubmit() {
    const params = {
      username: this.model.user,
      password: this.model.password
    }
    this.serverHttp.login(params).subscribe((data) => {
      if (data) {
        this.result = data
        if (this.result.detail === 'success'){
          alert('Đăng nhập thành công')
          this.router.navigate(['/account']);
        } else {
          alert(this.result.detail)
        }
      }
    })
  }

}
