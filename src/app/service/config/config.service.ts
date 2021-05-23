import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
    
    private appConfig: any;
    private http : HttpClient;
  
    constructor(http: HttpClient) {
        this.http = http;
    }

    loadAppConfig() {
        return this.http.get('/assets/config/app-settings.json')
            .toPromise()
            .then(config => {
            this.appConfig = config;
        });
    }

    get apiBaseUrl() : string {
        return this.appConfig.apiBaseUrl;
    }
    get auth() : string {
        return this.appConfig.auth;
    }
    get cbd_ip() : string {
        return this.appConfig.cbd_ip;
    }
    get cbd_port() : string {
        return this.appConfig.cbd_port;
    }
    get design_doc_route() : string {
        return this.appConfig.design_doc_route;
    }
    get reduce() : string {
        return this.appConfig.reduce;
    }
    get no_reduce() : string {
        return this.appConfig.no_reduce;
    }
}

