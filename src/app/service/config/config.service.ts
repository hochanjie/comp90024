import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
    
    private appConfig: any;
    private http : HttpClient;
    private apiUrl : string;
  
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
    loadAppUrlConfig() {
        return this.http.get('/ip', {responseType: 'text'})
            .toPromise()
            .then(data => {
            let ips = data.split(/[\r\n]+/)
            this.apiUrl = "http://"+ips[1]+":5984";
        });
    }
    

    get apiBaseUrl() : string {
//        return this.appConfig.apiBaseUrl;         
        return this.apiUrl;         
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
    get aurin_doc_route() : string {
        return this.appConfig.aurin_doc_route;
    }
}

