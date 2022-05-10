import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() authenticate = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
  }

  auth(state: boolean) {
    this.authenticate.emit(state);    
  }

}
