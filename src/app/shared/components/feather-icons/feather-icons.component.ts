import { Component, OnInit, Input } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-feather-icons',
  templateUrl: './feather-icons.component.html',
  styleUrls: ['./feather-icons.component.css']
})
export class FeatherIconsComponent implements OnInit {

  @Input('icon') public icon: any;
  constructor() { }

  ngOnInit(): void {
    feather.replace();
  }

}
