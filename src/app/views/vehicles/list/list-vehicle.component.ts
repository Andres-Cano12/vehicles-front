// Componentes
import { Component, ViewChild, OnInit } from "@angular/core";
import { APIENDPOINT, FILENAME, MESSAGES } from "../../../config/configuration";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core";
import * as _ from "underscore";
import * as $ from "jquery";

// Constants

// Modelos
import { PaginatioResponseModel } from "app/shared/models/common/pagination-response.model";
import { PaginationModel } from "app/shared/models/common/pagination.model";

// Servicios

import { ToastrService } from "ngx-toastr";
import { DataTable, LazyLoadEvent, SelectItem } from "primeng/primeng";
import { Router } from "@angular/router";
import { VehicleListService } from "app/shared/services/vehicles/vehicle.Lists.service";
import { VehicleService } from "app/shared/services/vehicles/vehicle.service";
import { DomSanitizer } from "@angular/platform-browser";
import { DataService } from "app/shared/services/data/data.service";
import { VehicleModel } from "app/shared/models/vehicle/vehicle.model";
import { MenuItem } from "primeng/api";

@Component({
  templateUrl: "list-vehicle.component.html",
  providers: [VehicleListService, VehicleService],
})
export class ListVehicleComponent implements OnInit {
  @ViewChild("table") table: DataTable;

  paginationModel: PaginationModel = new PaginationModel();
  results: PaginatioResponseModel<VehicleModel[]> = new PaginatioResponseModel<
  VehicleModel[]
  >();
  cols: any[];
  totalRecords: number;
  selectedCar: VehicleModel;
  items: MenuItem[];
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;

  constructor(
    private _toastrService: ToastrService,
    private _router: Router,
    private _mudanzaService: VehicleListService,
    private _mudanzaFile: VehicleService,
    private sanitizer: DomSanitizer,
    private data: DataService
  ) {
    this.results.list = [];

  }

  ngOnInit() {
    this.cols = [
      { field: "model", header: "Modelo" },
      { field: "licencePlate", header: "Placa" },
      { field: "idVehicleOwner", header: "Identificación propietario" },
      { field: "image", header: "Imagen" },
    ];

    this.sortOptions = [
      {label: 'Price High to Low', value: '!licencePlate'},
      {label: 'Price Low to High', value: 'licencePlate'},
      {label: 'Price Low to High', value: 'idVehicleOwner'}
    ];

    this.items = [
      {label: 'New', icon: 'pi pi-fw pi-plus'},
      {label: 'Open', icon: 'pi pi-fw pi-download'},
      {label: 'Undo', icon: 'pi pi-fw pi-refresh'}
  ];

    this.getAll();
  }

  getAll() {

    this._mudanzaService
    .getAll(APIENDPOINT.getAll)
    .subscribe((response) => {
      if (response.header.reponseCode === 200) {
        this.results.list = response.data;
        setTimeout(() => {
          this.data.showSpinner("false");
        }, 1000);
      } else {
        setTimeout(() => {
          this.data.showSpinner("false");
        }, 1000);
        this._toastrService.error(response.header.message, "");
      }
      // this.showSpinner = false;
    });
  }

  selectCar(event: Event, car: VehicleModel) {
    this.selectedCar = car;
    this.displayDialog = true;
    event.preventDefault();
  }




  loadLazy(event: LazyLoadEvent) {
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
  }
}