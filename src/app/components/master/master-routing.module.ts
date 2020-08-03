import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SizeComponent } from './size/size.component';


const routes: Routes = [
  {
    path: '',
    children: [
     
      {
        path: 'size',
        component: SizeComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
