import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/mergeMap';
import { environment } from 'environments/environment';
import { WebStorageService } from '../common/webStorage.service';
import { WEB_STORAGE_KEYS, AUTH_URLS } from 'app/config/configuration';
import { UserModel } from 'app/shared/models/user/user.model';
import { Observable, throwError, Subject, empty } from 'rxjs';
import { LoginModel } from 'app/shared/models/user/login.model';
import { ResponseModel } from 'app/shared/models/common/response.model';
import { HttpClient } from '@angular/common/http';
import { AuthResponseModel } from 'app/shared/models/auth/auth.response.model';
import { Router } from '@angular/router';
import { UserRoleEnum } from 'app/shared/enums/user-role-enum';
import { permissionsMap } from 'app/_permissions-map';

import { CountryModel } from 'app/shared/models/countries/country.model';
import { ResponseTokenModel } from 'app/shared/models/user/responseToken.model';
import { RegistrationViewModel } from 'app/shared/models/user/registrationViewModel';

@Injectable()
export class AuthService  {

    constructor(
        private _webStorage: WebStorageService,
        protected _httpClient: HttpClient,
        private _router: Router,
        protected _webStorageService: WebStorageService){
        }

    public loginRedirectUrl: string;
	public logoutRedirectUrl: string;
    public get loggedInUser(): UserModel {
        return JSON.parse(this._webStorageService.getSessionStorage(WEB_STORAGE_KEYS.USER));
    };


	public get loginUrl() { return AUTH_URLS.LOGIN_URL; }
    public get homeAdminUrl() { return ""; }
    public get homeUrl() { return AUTH_URLS.HOME_URL; }
    
    get accessToken() {
		return this._webStorage.getLocalStorage(WEB_STORAGE_KEYS.ACCESS_TOKEN);
    }

    get isLoggedIn(): boolean {
		return this.accessToken != null;
	}

    login(endpoint: string, object : LoginModel): Observable<ResponseTokenModel> {
        return this._httpClient.post<ResponseTokenModel>(`${environment.apiAuth}${endpoint}`, object)
            .pipe(
                map(resp =>{

                    if(resp && resp.data.value != undefined && resp.data.value != null)
                    {
                        alert("PUTA MADRE 1")
                        this._webStorage.setLocalStorage(WEB_STORAGE_KEYS.ACCESS_TOKEN, resp.data.value);
                        this._webStorage.setLocalStorage(WEB_STORAGE_KEYS.USER, resp.id);
                        return resp;
                    }

                    //TODO: ERROR MESSAAGE
                    this._router.navigate([AUTH_URLS.LOGIN_URL]);
                })
            );
    }

    create(endpoint: string, object : any): Observable<any> {
        return this._httpClient.post<any>(`${environment.apiAuth}${endpoint}`, object)
            .pipe(
                map(resp =>{
return resp;
                })
            );
    }

    


    logout(): void {
		this._webStorage.clearSessionStorage();
        this._router.navigate([this.loginUrl]);
    }

    currentUserHasRole(userRole: UserRoleEnum[]): boolean
    {
        // if (!this.loggedInUser) {
        //     return false;
        // }

        // for (let rol of userRole) {
        //     if (rol == this.loggedInUser.roleId) {
        //         return true;
        //     }
        // }

        return true;
    }
    
    hasAuthorizationToPath(path: string): boolean {
        let pathPermissions: UserRoleEnum[] = this.getPathPermisions(path);
        return this.currentUserHasRole(pathPermissions);
    }

    getPathPermisions(path: string): UserRoleEnum[] {
        let pathSteps: string[] = path.split(".");
        let currentStep: any = permissionsMap;
        for (let step of pathSteps) {
            currentStep = currentStep[step];
            if (!currentStep) {
                throw new Error(`El permiso especificado no se encuentra definido en la configuracion de roles. (Path: ${path})`);
            }
        }

        if (!(currentStep instanceof Array)) {
            throw new Error(`El permiso especificado no contiene roles definidos. (Path: ${path})`);
        }

        return currentStep;
    }
    
}
