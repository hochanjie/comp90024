import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudOpsService {
    
    // TODO: Remove this from code and set as secret environment variable
    private AUTH = "admin:group45";
    private CDB_IP = "172.26.130.174";
    private CDB_PORT = "5984";
    private DESIGN_DOC_ROUTE = "tweets/_design/TwitterData/_view";
    private REDUCE = "reduce=true&group_level=1";
    private NO_REDUCE = "reduce=false";
    private API_URL = "http://${AUTH}@${CDB_IP}:${CDB_PORT}/${DESIGN_DOC_ROUTE}"
    
    constructor(private httpclient: HttpClient) { }

    // Get all tweets
    public getAllTweets() : Observable<any> {
      let view = "AllTweets";
      return this.httpclient.get('${API_URL}/${view}');
    }

    // Get sentiments by place
    // If reducing, will provide summary statistics of the sentiments of that place instead
    // If provided a place as a key, will give the sentiments of tweets in that place
    public getSentimentsByPlace(key : string, reduce: boolean) : Observable<any> {
      let view = "SentimentsByPlace";

      if (reduce) {
        let red = this.REDUCE;
      }
      else {
        let red = this.NO_REDUCE;
      }

      if (key) {
        return this.httpclient.get('${API_URL}/${view}?key=\"${key}\"&${red}');
      } 
      else {
        return this.httpclient.get('${API_URL}/${view}?${red}');
      }
    }

    // Get tweets by place
    // If reducing, will provide the tweet counts of that place instead
    // If provided a place as a key, will give the tweets/tweet counts of that place
    public getTweetsByPlace(key : string, reduce: boolean) : Observable<any> {
      let view = "TweetsByPlace";
      if (reduce) {
        let red = this.REDUCE;
      }
      else {
        let red = this.NO_REDUCE;
      }

      if (key) {
        return this.httpclient.get('${API_URL}/${view}?key=\"${key}\"&${red}');
      } 
      else {
        return this.httpclient.get('${API_URL}/${view}?${red}');
      }    
    }

    // Get tweets by time
    // If reducing, will provide the tweet counts of the time instead
    // If provided a time range as a key, will give the tweets/tweet counts within that range
    public getTweetsByTime(start: number, end: number, reduce: boolean) : Observable<any> {
      let view = "TweetsByTime";

      if (reduce) {
        let red = this.REDUCE;
      }
      else {
        let red = this.NO_REDUCE;
      }

      if (start && end) {
        return this.httpclient.get('${API_URL}/${view}?startkey=\"${start}\"&endkey=\"${end}\"&${red}');
      } 
      else {
        return this.httpclient.get('${API_URL}/${view}?${red}');
      }    
    }

    // Get tweets by sentiments
    // If reducing, will provide the tweet counts of the sentiment instead
    // If provided a sentiment range as a key, will give the tweets/tweet counts within that range
    public getTweetsBySentiments(start: number, end: number, reduce: boolean) : Observable<any> {
      let view = "TweetsBySentiment";

      if (reduce) {
        let red = this.REDUCE;
      }
      else {
        let red = this.NO_REDUCE;
      }

      if (start && end) {
        return this.httpclient.get('${API_URL}/${view}?startkey=${start}&endkey=${end}&${red}');
      } 
      else {
        return this.httpclient.get('${API_URL}/${view}?${red}');
      }    
    }
}
