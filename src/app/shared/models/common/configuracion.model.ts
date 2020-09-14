import { Injectable } from '@angular/core';
import { DataService, CustomInterceptor } from '../../../../app/shared/services/countries/base.service';
import { environment } from 'environments/environment';

@Injectable()

export class Configuration
{
    
    public Server = environment.apiGatewayURL;
    public ApiUrl = 'api/';
    public ServerWithApiUrl = "";
    constructor() 
    {
         this.ServerWithApiUrl = this.Server + this.ApiUrl;
    }
}

