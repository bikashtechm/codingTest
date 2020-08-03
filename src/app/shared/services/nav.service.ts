import { Injectable } from '@angular/core';

export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  active?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root'
})
export class NavService {
  collapseSidebar = false;

  constructor() { }

  MenuItems: Menu[] = [
    {
      path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', active: true
    },

    {
      title: 'Masters', icon: 'clipboard', type: 'sub', active: false, children: [
        { path: '/masters/size', title: 'Size Master', type: 'link', active: false },
      ]
    }
  ];


  // items = this.MenuItems;
}
