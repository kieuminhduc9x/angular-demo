import { isNgTemplate, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { element } from 'protractor';
import { ServiceService } from '../service/service.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  formAccount: FormGroup;
  account: any = []
  isEdit: Boolean = false
  modelAccount: any = {}
  genderList: any = [
    {
      value: 'M',
      name: 'Nam'
    },
    {
      value: 'F',
      name: 'Nữ'
    }
  ]

  constructor(
    private serverHttp: ServiceService,
    private formBuilder: FormBuilder
  ) {
    this.formAccount = this.formBuilder.group({
      account_number: ['', [Validators.required, Validators.maxLength(250)]],
      firstname: ['', [Validators.required, Validators.maxLength(250)]],
      lastname: ['', [Validators.required, Validators.maxLength(250)]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.maxLength(250)]],
      address: ['', [Validators.required, Validators.maxLength(250)]]
    })
  }

  getNameByValue(value: any, array: any) {
    for (let item of array) {
      if (item.value === value) {
        return item.name
      }
    }
  }

  addRow() {
    const { account } = this
    const newData = {
      account_number: null,
      firstname: '',
      lastname: '',
      age: '',
      gender: '',
      email: '',
      address: '',
      editable: true
    }
    this.account = [newData,...account]
  }
  onEdit(item : any) {
    this.modelAccount = item
    this.modelAccount.account_number = item.account_number
    console.log(item, this.modelAccount)
    item.editable = true
    this.isEdit = true
  }
  onSave(item: any) {
    const params = {
      account_number: this.modelAccount.account_number,
      firstname: this.modelAccount.firstname,
      lastname: this.modelAccount.lastname,
      age: Number(this.modelAccount.age),
      gender: this.modelAccount.gender,
      email: this.modelAccount.email,
      address: this.modelAccount.address
    }
    console.log(params)
    if (item.account_number === null || item.account_number === undefined || !item.account_number) {
      this.serverHttp.createAccount(params).subscribe(data => {
        if (data) {
          alert('Thêm mới account thành công')
          this.getListAccount()
        }
      })
    } else {
      this.serverHttp.updateAccount(params).subscribe((data) => {
        if (data) {
          alert('Cập nhât account thành công')
          this.getListAccount()
        }
      })
    }
    this.isEdit = false
  }

  onDelete(id: any) {
    this.serverHttp.deleteAccount(id).subscribe(data => {
      if(data) {
        alert('Xóa account thành công')
        this.getListAccount()
      }
    })
  }
  getListAccount () {
    this.serverHttp.getInfo().subscribe((data) => {
      this.account = data.data
    })
  }
  ngOnInit(): void {
    this.serverHttp.getInfo().subscribe((data) => {
      this.account = data.data
    })
  }

}
