import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { SizeComponent } from './size/size.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [SizeComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDatatableModule
  ]
})
export class MasterModule { }
