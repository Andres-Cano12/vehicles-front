// Componentes
import { APIENDPOINT } from '../../config/configuration';
import { environment } from 'environments/environment';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

// Modelos
import { ResponseModel } from '../models/common/response.model';
import { FileModel } from '../models/common/file.model';

// Servicios
import { BaseService } from './_base.service';

@Injectable()
export class FileService extends BaseService<FileModel, null> {
    private apiFileURL: string;

    constructor(protected _http: HttpClient) {
        super(_http, environment.apiGatewayURL);
        this.apiFileURL = environment.apiGatewayURL;
    }

    saveS3(endPoint: string, fileModel: FileModel): Observable<ResponseModel<string>> {
        let apiURL = `${this._apiRoot}${endPoint}`;

        return this._http.post(apiURL, fileModel, { headers: this.headersConfig.httpHeaders })
        .map((resp: ResponseModel<string>) => {
            this.responseModel.header = resp.header;
            this.responseModel.data = resp.data;
            return this.responseModel;
        });
    }
}
