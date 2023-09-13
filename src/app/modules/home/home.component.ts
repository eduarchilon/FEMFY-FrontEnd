import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string = 'femfy-ui';

  isLogin: boolean = false;

  constructor(private router: Router) {}
  ngOnInit(): void {}

  //TODO: para probar las rutas con distinto layout
  changeLayout(): void {
    this.isLogin = !this.isLogin;
    console.log(this.isLogin);
  }
}
