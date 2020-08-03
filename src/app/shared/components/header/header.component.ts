import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  open = false;
  openNav = false;
  isOpenMobile: boolean;

  constructor(private navServices: NavService) { }

  ngOnInit() {

  }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }
  openMobileNav() {
    this.openNav = !this.openNav;
  }
}
