import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudOpsService {
    
    private REST_API_SERVER = "http://172.26.130.174:5984/_utils";

    constructor(private httpClient: HttpClient) { }
    
    public sendGetRequest(){
        return this.httpClient.get(this.REST_API_SERVER);
    }
}
