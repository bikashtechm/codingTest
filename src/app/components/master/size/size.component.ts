import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DBOperation } from 'src/app/shared/dbOperation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { TextFieldValidator, NotWhiteSpaceValidator } from 'src/app/shared/validators/validations.validators';
import { Global } from 'src/app/shared/global';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit, OnDestroy {
  dbops: DBOperation;
  sizeForm: FormGroup;
  buttonText: string = "Save";
  objRows: any[];
  objRow: any;
  sizeStubData: any = {};

  formErrors = {
    'name': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required',
      'minlength': 'Name can not be less than 1 characters long',
      'maxlength': 'Name can not be more  than 10 characters long',
      'validTextField': 'Name must be contains only number and letters',
      'notWhiteSpaceValidator': 'Only white space not allowed'
    }
  }

  @ViewChild('tabset', { static: true }) elngbTabSet: any;
  constructor(private _fb: FormBuilder, private _dataService: DataService, private _toastr: ToastrService, private httpClient: HttpClient) {

  }

  setFormState(): void {
    this.dbops = DBOperation.create;
    this.sizeForm = this._fb.group({
      Id: [0],
      name: ['', Validators.compose([Validators.required,
      Validators.maxLength(10),
      Validators.minLength(1),
      TextFieldValidator.validTextField,
      NotWhiteSpaceValidator.notWhiteSpaceValidator
      ])]
    })
    this.sizeForm.valueChanges.subscribe(fData => this.onValueChanged(fData));
    this.sizeForm.reset();
  }

  onValueChanged(data?: any) {
    if (!this.sizeForm) { return; }
    const form = this.sizeForm;
    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  ngOnInit() {
    //  Swal.fire('Hello world!');
    //Swal.fire('Oops...', 'Something went wrong!', 'error');
    this.getData();
    this.setFormState();
  }
  
  getData() {
    this.httpClient.get('../../../../assets/stubs/sizeMaster.json').subscribe(
   // this._dataService.get(Global.BASE_USER_ENDPOINT + "SizeMaster/GetAll/").subscribe(
      sizeData => {
        this.sizeStubData = sizeData;
        this.objRows = this.sizeStubData.data;
      });
  }

  onSubmit(formData: any) {
    //debugger;
    if (this.sizeForm.valid) {
      switch (this.dbops) {
        case DBOperation.create:
          this.sizeForm.controls["Id"].setValue(0);
          this.httpClient.get('../../../../assets/stubs/sizeMaster.json').subscribe(
         // this._dataService.post(Global.BASE_USER_ENDPOINT + "SizeMaster/Save/", formData.value).subscribe(
            data => {
              this.sizeStubData = data;
              if (this.sizeStubData.isSuccess) {
                Swal.fire(
                  'Added!',
                  'Your record has been Added.',
                  'success'
                )
                this._toastr.success("Data Saved Successfully !!", "Size Master");
                this.getData();
                this.cancelForm();
                this.elngbTabSet.select('Viewtab');
              } else {
                this._toastr.warning(this.sizeStubData.errors[0], "Size Master");
              }
            });
          break;

        case DBOperation.update:
          this.httpClient.get('../../../../assets/stubs/sizeMaster.json').subscribe(
         // this._dataService.post(Global.BASE_USER_ENDPOINT + "SizeMaster/Update/", formData.value).subscribe(
            data => {
              this.sizeStubData = data;
              if (this.sizeStubData.isSuccess) {
                this._toastr.success("Data Saved Successfully !!", "Size Master");
                this.getData();
                this.cancelForm();
                this.elngbTabSet.select('Viewtab');
              } else {
                this._toastr.warning(this.sizeStubData.errors[0], "Size Master");
              }
            });
          break;

      }
    } else {
      this._toastr.error("Error Occured !!", "Size Master");
    }
  }

  cancelForm() {
    this.dbops = DBOperation.create;
    this.buttonText = "Save";
    if (this.sizeForm.value != null) {
      this.setFormState();
    }
  }

  EditRow(Id: number) {
    this.dbops = DBOperation.update;
    this.buttonText = "Update";
    this.elngbTabSet.select('Addtab');
    //debugger;
    this.objRow = this.objRows.filter(x => x.id == Id)[0];
    this.sizeForm.controls["Id"].setValue(this.objRow.id);
    this.sizeForm.controls["name"].setValue(this.objRow.name);
  }

  DeleteRow(Id: number) {
    let obj = { id: Id };
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!'
      ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.httpClient.get('../../../../assets/stubs/sizeMaster.json').subscribe(
       // this._dataService.post(Global.BASE_USER_ENDPOINT + "SizeMaster/Delete/", obj).subscribe(
          deleteObj => {
            this.sizeStubData = deleteObj
            if (this.sizeStubData.isSuccess) {
              this._toastr.success("Data Deleted Successfully !!", "Size Master");
              this.getData();
            } else {
              this._toastr.success(this.sizeStubData.errors[0], "Size Master");
            }
          }
        );
        Swal.fire(
          'Deleted!',
          'Your record has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        )
      }
    }
    )
  }

  beforeChange(event: any) {

  }
  ngOnDestroy() {
    this.objRows = null;
    this.objRow = null;
  }

}
