import { Component, Input } from '@angular/core';
import { PaginationModel } from '../../models/common/pagination.model';
import { ResponseFilterModel } from '../../models/common/response-filter.model';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent {
  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }

}
