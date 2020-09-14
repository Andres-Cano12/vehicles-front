


import { Injectable } from "@angular/core";
import { environment } from 'environments/environment';
import { BaseService } from "../_base.service";
import { CountryModel } from "../../models/countries/country.model";
import { HttpClient } from "@angular/common/http";
import { MaestroCountryModel } from "../../models/countries/maestro-country.model";

@Injectable()
export class CountryService  extends BaseService<CountryModel, MaestroCountryModel> {

    private apiURL: string;

    constructor(protected _http: HttpClient) {
        super(_http, environment.apiGatewayURL);
        this.apiURL = environment.apiGatewayURL;
    }





    
}
