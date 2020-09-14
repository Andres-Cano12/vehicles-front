import { Injectable } from "@angular/core";
import { environment } from 'environments/environment';
import { BaseService } from "../_base.service";
import { HttpClient } from "@angular/common/http";
import { VehicleModel } from "app/shared/models/vehicle/vehicle.model";


@Injectable()
export class VehicleListService  extends BaseService<VehicleModel, VehicleModel> {

    private apiURL: string;

    constructor(protected _http: HttpClient) {
        super(_http, environment.apiGatewayURL);
        this.apiURL = environment.apiGatewayURL;
    }
}