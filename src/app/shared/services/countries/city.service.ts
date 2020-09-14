


import { Injectable } from "@angular/core";
import { environment } from 'environments/environment';
import { BaseService } from "../_base.service";
import { CityModel } from "../../models/countries/city.model";
import { HttpClient } from "@angular/common/http";
import { MaestroCityModel } from "../../models/countries/maestro-city.model";

@Injectable()
export class CityService  extends BaseService<CityModel, MaestroCityModel> {

    private apiURL: string;

    constructor(protected _http: HttpClient) {
        super(_http, environment.apiGatewayURL);
        this.apiURL = environment.apiGatewayURL;
    }
}
