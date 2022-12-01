import { Component, OnInit } from '@angular/core';
import { User } from "../../models/User"

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBar implements OnInit {
  loggedUser:User;

  constructor() { }
  
  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    this.loggedUser = JSON.parse(usuario);
  }
  
  logOut() {
    localStorage.removeItem('usuario');
    window.location.reload();
  }
  
  // someMethod() {
  //   this.trigger.openMenu();
  // }
}
