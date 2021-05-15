import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudOpsService {
//    private REST_API_SERVER = "admin:group45@172.26.131.35:5984/tweets/_all_docs?include_docs=true";
    
    
    private REST_API_SERVER = "http://172.26.131.35:5984/_all_dbs";

    constructor(private httpClient: HttpClient) { }
    
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('admin:group45')
      })
    };

    public sendGetRequest(){
        return this.httpClient.get(this.REST_API_SERVER, this.httpOptions);
    }
}
