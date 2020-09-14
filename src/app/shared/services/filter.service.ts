// Plugins
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

// Modelos
import { PaginationModel } from '../models/common/pagination.model';
import { ResponseModel } from '../models/common/response.model';
import { PaginatioResponseModel } from '../models/common/pagination-response.model';
import { FilterModel } from '../models/common/filter.model';
import { ResponseFilterModel } from '../models/common/response-filter.model';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

// Servicios
import { BaseService } from './_base.service';


@Injectable()
export class FilterService extends BaseService<FilterModel, ResponseFilterModel> {

    private apiFilterURL: string;

    constructor(protected _http: HttpClient) {
        super(_http);
    }

    getMasterFilter(fullEndPoint: string): Observable<ResponseModel<ResponseFilterModel>> {
        return this._http.get(fullEndPoint).map((resp: ResponseModel<ResponseFilterModel>) => {
                this.responseModel.header = resp.header;
                this.responseModel.data = resp.data;
                return this.responseModel;
            });
    }
}
