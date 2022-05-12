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
    let input = this.userForm.value;
    input.password = '' + this.cyrb53(input.password);
    console.log(input);
    this.showStatusMessage = true;

    try {
      const insertedAccount = await this.accountService.createAccount(input);
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
    let hash = '' + this.cyrb53(input.password);

    this.accounts.forEach(account => {
      console.log(hash + ' = ' + account.password);
      if (input.user === account.user && hash === account.password) {
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

  async testCrypto() {
    this.showStatusMessage = true;
    let input = this.userForm.value;
    this.statusMessage = input.password + ' = ' + this.cyrb53(input.password); 
    input.password = this.cyrb53(input.password);
    this.success = true;
  }

  cyrb53(str: string, seed = 39) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

}
