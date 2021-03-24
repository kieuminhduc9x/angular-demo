import { isNgTemplate, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
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
  isNotNumber = false
  page = 0
  pageSize = 8
  count = 0


  ngOnInit(): void {
    this.serverHttp.getInfo({}).subscribe((data: any) => {
      this.account = data.data
      this.count = this.account.length
    })
  }

  constructor(
    private serverHttp: ServiceService,
    private formBuilder: FormBuilder
  ) {
    this.formAccount = this.formBuilder.group({
      account_number: [''],
      firstname: ['', [Validators.required, Validators.maxLength(250)]],
      lastname: ['', [Validators.required, Validators.maxLength(250)]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.maxLength(2)]],
      email: ['', [Validators.required, Validators.maxLength(250), Validators.email]],
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
    this.account = [newData, ...account]
  }
  onEdit(item: any) {
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
    if (this.formAccount.valid) {
      if (item.account_number === null || item.account_number === undefined || !item.account_number) {
        this.serverHttp.createAccount(params).subscribe(data => {
          if (data) {
            alert('Thêm mới account thành công')
            this.getListAccount()
            this.modelAccount = {}
          }
        })
      } else {
        this.serverHttp.updateAccount(params).subscribe((data) => {
          if (data) {
            alert('Cập nhât account thành công')
            this.getListAccount()
            this.modelAccount = {}
          }
        })
      }
    } else {
      this.formAccount.markAllAsTouched();
    }
  }

  onDelete(id: any) {
    this.serverHttp.deleteAccount(id).subscribe(data => {
      if (data) {
        alert('Xóa account thành công')
        this.getListAccount()
      }
    })
  }
  getListAccount() {
    const params = {
      page: this.page ? this.page : null,
      pageSize: this.pageSize ? this.pageSize : null
    }
    this.serverHttp.getInfo(params).subscribe((data: any) => {
      this.account = data.data
    })
  }

  handlePageChange(event: any) {
    this.page = event;
    this.getListAccount();
  }

}
