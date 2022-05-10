import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from './models/account';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  accounts: Account[] = [];
  title = 'education-management-system';
  isAuthenticated: boolean = false;
  isRegistering: boolean = false;
  userForm!: FormGroup;
  statusMessage: string = '';
  showStatusMessage: boolean = false;
  success: boolean = false;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getAccounts();

    this.userForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async getAccounts() {
    try {
      this.accounts = await this.accountService.getAccounts();
    } catch (err) {
      console.error(err);
    }
  }

  setAuthentication(state: boolean) {
    this.isAuthenticated = state;
  }

  toggleRegistration() {
    if (this.isRegistering) {
      this.isRegistering = false;
    } else {
      this.isRegistering = true;
    }
  }

  async createUser() {
    this.statusMessage = '';
    const account = this.userForm.value;
    console.log(account);
    this.showStatusMessage = true;

    try {
      const insertedAccount = await this.accountService.createAccount(account);
      this.success = true;
      this.statusMessage = 'Űj felhasználó jött létre a következő felhasználónévvel: ' + insertedAccount.user;
      this.toggleRegistration();
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

  tryLogin() {
    this.statusMessage = '';    
    this.showStatusMessage = true;
    const input = this.userForm.value;
    console.log(input);
    let success = false;

    this.accounts.forEach(account => {
      if (input.user === account.user && input.password === account.password) {
        success = true;
      }
    });

    if (success) {
      this.statusMessage = 'Sikeres belépés.';
      this.success = true;
    } else {
      this.statusMessage = "Rossz felhasználónév vagy jelszó.";
      this.success = false;
    }

    this.setAuthentication(success);
  }

}
