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
  selector: "create-file-vehicle",
  templateUrl: "create-file-vehicle.component.html",
  providers: [VehicleService, DataService],
})
export class CreateFileVehicleComponent implements OnInit {

  uploadedFiles: any[] = [];
  fileUrl;


  @ViewChild("fileUpload") fileUpload: any;

  constructor(
    private fb: FormBuilder,
    private _vehicleService: VehicleService,
    private _toastrService: ToastrService,
    private _router: Router,
    private sanitizer: DomSanitizer,
    private data: DataService
  ) {

  
  }

  ngOnInit() {
  }

  myUploader(event): void {
    if (event.files[0].size == 0) {
      this._toastrService.warning(MESSAGES.EmptyFile, "");
      return;
    }


   
    var fileToUpload = event.files[0];

    let input = new FormData();
    input.append("file", fileToUpload);

    console.log(input)


    this._vehicleService
      .create(APIENDPOINT.uploadFile, input)
      .subscribe((response) => {
        if (response.header.reponseCode === 200) {
          this._toastrService.success("Registros exitosos", '');
  
        } else {
          this._toastrService.error(response.header.message, "");
          setTimeout(() => {
            // this.data.showSpinner("false");
          }, 500);
        }
      });
  }

  clearFields() {
    this.fileUpload.clear();
  }
}