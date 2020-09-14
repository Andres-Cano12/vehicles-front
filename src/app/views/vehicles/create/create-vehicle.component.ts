// Componentes
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { APIENDPOINT, MESSAGES, FILENAME } from "../../../config/configuration";
import { Router } from "@angular/router";

// Modelos
import * as _ from "underscore";

// Servicios
import { ToastrService } from "ngx-toastr";

import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from "@angular/forms";


import { DomSanitizer } from "@angular/platform-browser";
import { DataService } from "app/shared/services/data/data.service";
import { RegistrationViewModel } from "app/shared/models/user/registrationViewModel";
import { VehicleService } from "app/shared/services/vehicles/vehicle.service";

@Component({
  selector: "create-vehicle",
  templateUrl: "create-vehicle.component.html",
  providers: [VehicleService, DataService],
})
export class CreateVehicleComponent implements OnInit {
  form: FormGroup;
  uploadedFiles: any[] = [];
  fileUrl;
  contentDownloadFile: string = "";
  fileName = FILENAME.dowloadFileName;
  selectedModels: string[] = [];
  models: any[];

  @ViewChild("fileUpload") fileUpload: any;

  constructor(
    private fb: FormBuilder,
    private _vehicleService: VehicleService,
    private _toastrService: ToastrService,
    private _router: Router,
    private sanitizer: DomSanitizer,
    private data: DataService
  ) {

    this.models = [
      {name: '1960', code: '1960'},
      {name: '1961', code: '1961'},
      {name: '1962', code: '1962'},
      {name: '1963', code: '1963'},
      {name: '1964', code: '1964'},
      {name: '1965', code: '1965'},
      {name: '1966', code: '1966'},
      {name: '1967', code: '1967'},
      {name: '1968', code: '1968'},
      {name: '1969', code: '1969'},
      {name: '1970', code: '1970'},
      {name: '1971', code: '1971'},
      {name: '1972', code: '1972'},
      {name: '1973', code: '1973'},
      {name: '1974', code: '1974'},
      {name: '1975', code: '1975'},
      {name: '1976', code: '1976'},
      {name: '1977', code: '1977'},
      {name: '1978', code: '1978'},
      {name: '1979', code: '1979'},
      {name: '1980', code: '1980'},
      {name: '1981', code: '1981'},
      {name: '1982', code: '1982'},
      {name: '1983', code: '1983'},
      {name: '1984', code: '1984'},
      {name: '1985', code: '1985'},
      {name: '1986', code: '1986'},
      {name: '1987', code: '1987'},
      {name: '1988', code: '1988'},
      {name: '1989', code: '1989'},
      {name: '1990', code: '1990'},
      {name: '1991', code: '1991'},
      {name: '1992', code: '1992'},
      {name: '1993', code: '1993'},
      {name: '1994', code: '1994'},
      {name: '1995', code: '1995'},
      {name: '1996', code: '1996'},
      {name: '1997', code: '1997'},
      {name: '1998', code: '1998'},
      {name: '1999', code: '1999'},
      {name: '2000', code: '2000'},
      {name: '2001', code: '2001'},
      {name: '2002', code: '2002'},
      {name: '2003', code: '2003'},
      {name: '2004', code: '2004'},
      {name: '2005', code: '2005'},
      {name: '2006', code: '2006'},
      {name: '2007', code: '2007'},
      {name: '2008', code: '2008'},
      {name: '2009', code: '2009'},
      {name: '2010', code: '2010'},
      {name: '2011', code: '2011'},
      {name: '2012', code: '2012'},
      {name: '2013', code: '2013'},
      {name: '2014', code: '2014'},
      {name: '2015', code: '2015'},
      {name: '2016', code: '2016'},
      {name: '2017', code: '2017'},
      {name: '2018', code: '2018'},
      {name: '2019', code: '2019'},
      {name: '2020', code: '2020'},

  ];
  }

  ngOnInit() {
    this.form = this.fb.group({
      LicencePlate: new FormControl("", Validators.required),
      IdVehicleOwner: new FormControl("", Validators.required),
      Model: new FormControl("", Validators.required),
      Value: new FormControl("", Validators.required),
      file: new FormControl("", Validators.required),
    });
  }

  myUploader(event): void {
    if (event.files[0].size == 0) {
      this._toastrService.warning(MESSAGES.EmptyFile, "");
      return;
    }

    // if (this.form.controls["IdentificationCard"].value === "") {
    //   this.form.validator
    //   this._toastrService.warning(MESSAGES.validationMessage, "");
    //   return;
    // }
   
    var fileToUpload = event.files[0];

    let input = new FormData();
    input.append("file", fileToUpload);
    input.append("LicencePlate", this.form.controls["LicencePlate"].value);
    input.append("IdVehicleOwner", this.form.controls["IdVehicleOwner"].value);
    input.append("Model", JSON.stringify(this.form.controls["Model"].value));
    input.append("Value", this.form.controls["Value"].value);
    input.append("Image", event.files[0].fileName);
    console.log(input)


    this._vehicleService
      .create(APIENDPOINT.createVehicle, input)
      .subscribe((response) => {
        if (response.header.reponseCode === 200) {
          this._toastrService.success("Registro exitoso", '');
          setTimeout(() => {
            // this.data.showSpinner("false");
          }, 500);
  
        } else {
          this._toastrService.error(response.header.message, "");
          setTimeout(() => {
            // this.data.showSpinner("false");
          }, 500);
        }
      });
  }

  clearFields() {
    this.form.reset();
    this.fileUpload.clear();
  }
}