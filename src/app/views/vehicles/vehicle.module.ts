import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CreateVehicleComponent } from './create/create-vehicle.component';
import { ListVehicleComponent } from './list/list-vehicle.component';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { SharedModule } from '../../shared/ShareModules';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CreateFileVehicleComponent } from './create-file/create-file-vehicle.component';

@NgModule({
  imports: [
    VehicleRoutingModule,
    BsDropdownModule,
    FormsModule,
    NgbModule,
    SharedModule,
    CommonModule
  ],
  declarations: [ CreateVehicleComponent, ListVehicleComponent, CreateFileVehicleComponent ]
})
export class VehicleModule { }
