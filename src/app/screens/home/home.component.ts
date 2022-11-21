import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  openModal:boolean = true;
  userForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    let user = localStorage.getItem('usuario');
    if(user) {
      this.openModal = false;
      console.log(user);
    }
  }

}
