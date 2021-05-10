import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudOpsService {
    
    private REST_API_SERVER = "admin:group45@http://172.26.131.35:5984/tweets/_all_docs?include_docs=true";

    constructor(private httpClient: HttpClient) { }
    
    public sendGetRequest(){
        return this.httpClient.get(this.REST_API_SERVER);
    }
}
