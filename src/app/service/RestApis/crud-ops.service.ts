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
    private aurin_doc_route:string = this.configService.aurin_doc_route;
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
    
    // Get all tweets
    public getAllTweets() : Observable<any> {
      let view = "/AllTweets";
      return this.httpclient.get(this.baseUrl+this.design_doc_route+view, this.httpOptions);
    }
    
    // Get sentiments by city
    // If reducing, will provide summary statistics of the sentiments of that city instead
    // If provided a city as a key, will give the sentiments of tweets in that city
    public getAvgSentimentsByCity(key : string, reduce: boolean) : Observable<any> {
      let view = "AvgSentimentsByCity";
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
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
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
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
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
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
      }    
    }
    
    // Get sentiments by SA2_name
    // If reducing, will provide summary statistics of the sentiments of that SA2_name instead
    // If provided a SA2_name as a key, will give the sentiments of tweets in that SA2_name
    public getAVGSentimentsBySA2Name(key : string, reduce: boolean) : Observable<any> {
      let view = "AvgSentimentsBySA2Name";
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
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
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
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
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
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?startkey='+'"'+start+'"'+'&endkey='+'"'+end+'"'+'&'+red, this.httpOptions);
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
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
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?startkey='+'"'+start+'"'+'&endkey='+'"'+end+'"'+'&'+red, this.httpOptions);
      } 
      else {
          return this.httpclient.get(this.baseUrl+this.design_doc_route+view+'?'+red, this.httpOptions);
      }    
    }
    
    public getSa2Adelaide() : Observable<any> {
      let view = "/adelaide";
      return this.httpclient.get(this.baseUrl+this.aurin_doc_route+view, this.httpOptions);
    }
    public getSa2Brisbane() : Observable<any> {
      let view = "/brisbane";
      return this.httpclient.get(this.baseUrl+this.aurin_doc_route+view, this.httpOptions);
    }
    public getSa2Melbourne() : Observable<any> {
      let view = "/melbourne";
      return this.httpclient.get(this.baseUrl+this.aurin_doc_route+view, this.httpOptions);
    }
    public getSa2Perth() : Observable<any> {
      let view = "/perth";
      return this.httpclient.get(this.baseUrl+this.aurin_doc_route+view, this.httpOptions);
    }
    public getSa2Sydney() : Observable<any> {
      let view = "/sydney";
      return this.httpclient.get(this.baseUrl+this.aurin_doc_route+view, this.httpOptions);
    }
    
    public getSa2() : Observable<any> {
      let view = "/sa2";
      return this.httpclient.get(this.baseUrl+this.aurin_doc_route+view, this.httpOptions);
    }
    public getHomeless_obj() : Observable<any> {
      let view = "/homeless";
      return this.httpclient.get(this.baseUrl+this.aurin_doc_route+view, this.httpOptions);
    }
    public getIncome_obj() : Observable<any> {
      let view = "/income";
      return this.httpclient.get(this.baseUrl+this.aurin_doc_route+view, this.httpOptions);
    }
    public getPopulation_obj() : Observable<any> {
      let view = "/population";
      return this.httpclient.get(this.baseUrl+this.aurin_doc_route+view, this.httpOptions);
    }
    
    
}
