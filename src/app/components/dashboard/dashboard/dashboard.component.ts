import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Global } from 'src/app/shared/global';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  orders_status: any = {};

  order = [];
  settings = {
    actions: true,
    hideSubHeader: false,
    columns: {
      orderId: { title: 'Order Id', filter: true },
      orderStatus: { title: 'Order Status', filter: false, type: 'html' },
      paymentMethod: { title: 'Payment Method', filter: true },
      paymentDate: { title: 'Payment Date', filter: true },
      totalAmount: { title: 'Total Amount', filter: true },
    }
  };
  constructor(private _dataService: DataService, private _toastr: ToastrService, private httpClient: HttpClient) { }
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.httpClient.get('../../../../assets/stubs/latestOrder.json').subscribe(
   // this._dataService.get(Global.BASE_USER_ENDPOINT + "PaymentMaster/GetReportManageOrder/").subscribe(
      objData => {
        this.orders_status = objData;
        if (this.orders_status.isSuccess) {
          this.order = this.orders_status.data;
        } else {
          this._toastr.error(this.orders_status.errors[0], 'Dashboard');
        }
      });
  }
}
