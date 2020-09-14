import { environment } from 'environments/environment';
import { BaseService } from "../_base.service";
import { HttpClient } from "@angular/common/http";
import { RegistrationViewModel } from "app/shared/models/user/registrationViewModel";
import { Injectable } from '@angular/core';

@Injectable()
export class RegistrationService  extends BaseService<any, any> {

    private apiURL: string;

    constructor(protected _http: HttpClient) {
        super(_http, environment.apiAuth);
        this.apiURL = environment.apiAuth;
    }
}