import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { CreateFileVehicleComponent } from './create-file/create-file-vehicle.component';

import { CreateVehicleComponent } from './create/create-vehicle.component';
import { ListVehicleComponent } from './list/list-vehicle.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Vehículos'
    },
    children: [
      {
        path: 'create',
        component: CreateVehicleComponent,
        data: {
          title: 'Crear Vehículo'
        }
      },
      {
        path: 'create-file',
        component: CreateFileVehicleComponent,
        data: {
          title: 'Crear Vehículos desde archivo'
        }
      },
      {
        path: 'list',
        component: ListVehicleComponent,
        data: {
          title: 'Listado Vehículos'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule {}
