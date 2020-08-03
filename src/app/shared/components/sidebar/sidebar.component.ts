import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: Menu[];
  FullName = 'Bikash Shaw';
  UserType = 'Admin';

  constructor(private navService: NavService) {
    this.menuItems = this.navService.MenuItems;
  }

  ngOnInit() {
  }

  toggleNavActive(item) {
    console.log(item.active);
    item.active  = ! item.active;
  }

}
