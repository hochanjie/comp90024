import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

import { ConfigService } from '../config/config.service';


@Injectable({
  providedIn: 'root'
})
export class CrudOpsService {
    private baseUrl:string = this.configService.apiBaseUrl;
    private auth:string = this.configService.auth;
    private cbd_ip:string = this.configService.cbd_ip;
    private cbd_port:string = this.configService.cbd_port;
    private design_doc_route:string = this.configService.design_doc_route;
    private reduce:string = this.configService.reduce;
    private no_reduce:string = this.configService.no_reduce;
    
    private httpOptions = {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Basic ' + btoa(this.auth)
              })
            };
    
    constructor(private httpclient: HttpClient,private configService: ConfigService) { }    

    public sendGetRequest(){
        return this.httpclient.get(this.baseUrl+'/_all_dbs', this.httpOptions);
    } 
    
        
    // TODO: Remove this from code and set as secret environment variable
//    private AUTH = "admin:group45";
//    private CDB_IP = "172.26.131.241";
//    private CDB_PORT = "5984";
//    private DESIGN_DOC_ROUTE = "tweets/_design/TwitterData/_view";
//    private REDUCE = "reduce=true&group_level=1";
//    private NO_REDUCE = "reduce=false";
//    private API_URL = "http://${AUTH}@${CDB_IP}:${CDB_PORT}/${DESIGN_DOC_ROUTE}"
//    
    
    // Get all tweets
    public getAllTweets() : Observable<any> {
      let view = "/AllTweets";
      return this.httpclient.get(this.baseUrl+this.design_doc_route+view, this.httpOptions);
    }

    // Get sentiments by place
    // If reducing, will provide summary statistics of the sentiments of that place instead
    // If provided a place as a key, will give the sentiments of tweets in that place
    public getSentimentsByPlace(key : string, reduce: boolean) : Observable<any> {
      let view = "SentimentsByPlace";
      let red;
        if (reduce) {
            red = this.reduce;
          }
          else {
            red = this.no_reduce;
          }

          if (key) {
              return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?key='+'"'+key+'"'+'&'+red, this.httpOptions);
    //        return this.httpclient.get('${API_URL}/${view}?key=\"${key}\"&${red}');
          } 
          else {
              return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
    //        return this.httpclient.get('${API_URL}/${view}?${red}');
          }
    }
    // Get sentiments by city
    // If reducing, will provide summary statistics of the sentiments of that city instead
    // If provided a city as a key, will give the sentiments of tweets in that city
    public getSentimentsByCity(key : string, reduce: boolean) : Observable<any> {
      let view = "SentimentsByCity";
      let red;
      if (reduce) {
        red = this.reduce;
      }
      else {
        red = this.no_reduce;
      }

      if (key) {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?key='+'"'+key+'"'+'&'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?key=\"${key}\"&${red}');
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?${red}');
      }
    }

    // Get tweets by state
    // If reducing, will provide the tweet counts of that state instead
    // If provided a state as a key, will give the tweets/tweet counts of that state
    public getTweetsByState(key : string, reduce: boolean) : Observable<any> {
      let view = "TweetsByState";
        let red;
        if (reduce) {
            red = this.reduce;
          }
          else {
            red = this.no_reduce;
          }

          if (key) {
              return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?key='+'"'+key+'"'+'&'+red, this.httpOptions);
    //        return this.httpclient.get('${API_URL}/${view}?key=\"${key}\"&${red}');
          } 
          else {
              return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
    //        return this.httpclient.get('${API_URL}/${view}?${red}');
          }    
    }
    // Get sentiments by SA2_code
    // If reducing, will provide summary statistics of the sentiments of that SA2_code instead
    // If provided a SA2_code as a key, will give the sentiments of tweets in that SA2_code
    public getSentimentsBySA2Code(key : string, reduce: boolean) : Observable<any> {
      let view = "SentimentsBySA2Code";
        let red;
      if (reduce) {
        red = this.reduce;
      }
      else {
        red = this.no_reduce;
      }

      if (key) {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?key='+'"'+key+'"'+'&'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?key=\"${key}\"&${red}');
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?${red}');
      }    
    }
    // Get sentiments by state
    // If reducing, will provide summary statistics of the sentiments of that state instead
    // If provided a state as a key, will give the sentiments of tweets in that state
    public getSentimentsByState(key : string, reduce: boolean) : Observable<any> {
      let view = "SentimentsByState";
        let red;
      if (reduce) {
        red = this.reduce;
      }
      else {
        red = this.no_reduce;
      }

      if (key) {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?key='+'"'+key+'"'+'&'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?key=\"${key}\"&${red}');
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?${red}');
      }    
    }

    // Get sentiments by SA2_name
    // If reducing, will provide summary statistics of the sentiments of that SA2_name instead
    // If provided a SA2_name as a key, will give the sentiments of tweets in that SA2_name
    public getSentimentsBySA2NAme(key : string, reduce: boolean) : Observable<any> {
      let view = "SentimentsBySA2Name";
        let red;
      if (reduce) {
        red = this.reduce;
      }
      else {
        red = this.no_reduce;
      }

      if (key) {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?key='+'"'+key+'"'+'&'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?key=\"${key}\"&${red}');
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?${red}');
      }    
    }

    // Get tweets by city
    // If reducing, will provide the tweet counts of that city instead
    // If provided a city as a key, will give the tweets/tweet counts of that city
    public getTweetsByCity(key : string, reduce: boolean) : Observable<any> {
      let view = "TweetsByCity";
      let red;
      if (reduce) {
        red = this.reduce;
      }
      else {
        red = this.no_reduce;
      }

      if (key) {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?key='+'"'+key+'"'+'&'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?key=\"${key}\"&${red}');
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?${red}');
      }    
    }

    // Get tweets by SA2_code
    // If reducing, will provide the tweet counts of that SA2_code instead
    // If provided a SA2_code as a key, will give the tweets/tweet counts of that SA2_code
    public getTweetsBySA2Code(key : string, reduce: boolean) : Observable<any> {
      let view = "TweetsBySA2Code";
      let red;
      if (reduce) {
        red = this.reduce;
      }
      else {
        red = this.no_reduce;
      }

      if (key) {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?key='+'"'+key+'"'+'&'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?key=\"${key}\"&${red}');
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?${red}');
      }
    }    

    // Get tweets by place
    // If reducing, will provide the tweet counts of that place instead
    // If provided a place as a key, will give the tweets/tweet counts of that place
    public getTweetsByPlace(key : string, reduce: boolean) : Observable<any> {
      let view = "TweetsByPlace";
        let red;
      if (reduce) {
        red = this.reduce;
      }
      else {
        red = this.no_reduce;
      }

      if (key) {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?key='+'"'+key+'"'+'&'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?key=\"${key}\"&${red}');
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?${red}');
      }    
    }
    // Get tweets by SA2_name
    // If reducing, will provide the tweet counts of that SA2_name instead
    // If provided a SA2_name as a key, will give the tweets/tweet counts of that SA2_name
    public getTweetsBySA2Name(key : string, reduce: boolean) : Observable<any> {
      let view = "TweetsBySA2Name";
        let red;
      if (reduce) {
        red = this.reduce;
      }
      else {
        red = this.no_reduce;
      }

      if (key) {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?key='+'"'+key+'"'+'&'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?key=\"${key}\"&${red}');
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?${red}');
      }    
    }

    // Get tweets by time
    // If reducing, will provide the tweet counts of the time instead
    // If provided a time range as a key, will give the tweets/tweet counts within that range
    public getTweetsByTime(start: number, end: number, reduce: boolean) : Observable<any> {
      let view = "TweetsByTime";
        let red;
      if (reduce) {
        red = this.reduce;
      }
      else {
        red = this.no_reduce;
      }

      if (start && end) {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?startkey='+'"'+start+'"'+'&endkey='+end+'&'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?startkey=\"${start}\"&endkey=\"${end}\"&${red}');
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?${red}');
      }    
    }

    // Get tweets by sentiments
    // If reducing, will provide the tweet counts of the sentiment instead
    // If provided a sentiment range as a key, will give the tweets/tweet counts within that range
    public getTweetsBySentiments(start: number, end: number, reduce: boolean) : Observable<any> {
      let view = "TweetsBySentiment";
        let red
      if (reduce) {
        red = this.reduce;
      }
      else {
        red = this.no_reduce;
      }

      if (start && end) {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?startkey='+'"'+start+'"'+'&endkey='+end+'&'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?startkey=${start}&endkey=${end}&${red}');
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
//        return this.httpclient.get('${API_URL}/${view}?${red}');
      }    
    }
}
