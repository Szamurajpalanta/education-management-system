import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccounts() {
    return lastValueFrom(this.http.get<Account[]>('http://localhost:3000/api/accounts'));
  }

  getAccount(id: number) {
    return lastValueFrom(this.http.get<Account[]>(`http://localhost:3000/api/accounts/${id}`));
  }

  createAccount(account: Account) {
    return lastValueFrom(this.http.post<Account>('http://localhost:3000/api/accounts', account));
  }

  updateAccount(account: Account) {
    return lastValueFrom(this.http.put<Account>('http://localhost:3000/api/accounts', account));
  }

  deleteAccount(id: number) {
    return lastValueFrom(this.http.delete<Account>(`http://localhost:3000/api/accounts/${id}`));
  }
}
