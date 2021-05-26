import { Component, OnInit } from '@angular/core';

import { CrudOpsService } from '../service/RestApis/crud-ops.service';
import { GetMapDataService } from '../service/dataFetch/get-map-data.service';

import { ChartDataSets, ChartType, RadialChartOptions, ChartOptions } from 'chart.js';
import { Label,Color,MultiDataSet,SingleDataSet } from 'ng2-charts';

import { MapsAPILoader } from '@agm/core';

import { faExpand,faMapMarked } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    faExpand = faExpand;
    faMapMarked = faMapMarked;
    closeModal: string;
    
    geoJsonObject: any;
    lat: number;
    lng: number;
    zoom:number;
    public getTweetsByCity:any;
    public getSentimentsByCity:any;
    public markers:any;
    public currentCity:any;

    

    constructor(private _crudOps: CrudOpsService,private _mapsAPILoader: MapsAPILoader,private _getMapData: GetMapDataService) { }
        
    ngOnInit(): void {        
//        this._crudOps.sendGetRequest().subscribe((data: any[])=>{
//              console.log(data);
//            })
        
        //adelaide
        this.lat = -35;
        this.lng = 138.5;
        this.zoom = 11;
        this.currentCity = "Adelaide";

        this._crudOps.getAllTweets().subscribe((data: any[])=>{
              console.log("getAllTweets",data);
            })
        this._crudOps.getTweetsByTime(undefined,undefined,false).subscribe((data: any[])=>{
              console.log("getTweetsByTime",data);
            })
        this._crudOps.getTweetsBySentiments(undefined,undefined,false).subscribe((data: any[])=>{
              console.log("getTweetsBySentiments",data);
            })


        this._crudOps.getSentimentsByCity(undefined,true).subscribe((data: any)=>{
              console.log("getSentimentsByCity",data);
                this.getSentimentsByCity = data.rows;
            })


        this._crudOps.getSentimentsBySA2Code(undefined,true).subscribe((data: any[])=>{
              console.log("getSentimentsBySA2Code",data);
            })
        this._crudOps.getSentimentsBySA2NAme(undefined,false).subscribe((data: any[])=>{
              console.log("getSentimentsBySA2NAme",data);
            })




        this._crudOps.getAVGSentimentsBySA2Name('Abbotsford',true).subscribe((data: any[])=>{
              console.log("getAVGSentimentsBySA2NAme",data);
            })
        this._crudOps.getAVGSentimentsBySA2Name(undefined,true).subscribe((data: any[])=>{
              console.log("getAVGSentimentsBySA2NAme",data);
            })



        this._crudOps.getTweetsByCity(undefined,false).subscribe((data: any)=>{
                this.markers = data.rows            
        })
        this._crudOps.getTweetsByCity(undefined,true).subscribe((data: any)=>{
            this.getTweetsByCity = data.rows
               
        })




        this._crudOps.getTweetsBySA2Code(undefined,false).subscribe((data: any[])=>{
              console.log("getTweetsBySA2Code",data);
            })
        this._crudOps.getTweetsBySA2Name(undefined,false).subscribe((data: any[])=>{
              console.log("getTweetsBySA2Name",data);
            })
    
    }
    
    
    cityChange(cityName){
        console.log(cityName)
        this._crudOps.getTweetsByCity(cityName,false).subscribe((data: any)=>{
            this.markers = data.rows
            this.currentCity = cityName;
        })
    }
    
    
    clickedMarker(marker:any) {
        console.log(`clicked the marker: ${marker}`);
        console.log(`clicked the marker: ${marker.value.SA2_name}`);
        
      }
    //For map
    clicked(clickEvent) {
        console.log(clickEvent);
    }
    styleFunc(feature) {
        return ({
            clickable: false,
            fillColor: feature.getProperty('color'),
            strokeWeight: 1
        });
    }
    onpenModal(str){
        console.log(str)
        if(str == 'getStateService'){
            this._mapsAPILoader.load().then(() => {
                this.lat = -28;
                this.lng = 137;
                this.zoom = 4;
                this.geoJsonObject = this._getMapData.getStateService();
            });
        }        
    }
    
    
    
  
  //RadarChart
    public radarChartOptions: RadialChartOptions = {
        responsive: true,
      };
      public radarChartLabels: Label[] = ['Punctuality', 'Communication', 'Problem Solving',
        'Team Player', 'Coding', 'Technical Knowledge', 'Meeting Deadlines'];

      public radarChartData: ChartDataSets[] = [
        { data: [0, 1, 2, 3, 4, 5, 6], label: 'Employee Skill Analysis' }
      ];
      public radarChartType: ChartType = 'radar';
    
//    LineChart
    
    lineChartData: ChartDataSets[] = [
        { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
      ];

      lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

      lineChartOptions = {
        responsive: true,
      };

      lineChartColors: Color[] = [
        {
          borderColor: 'black',
          backgroundColor: 'rgba(255,255,0,0.28)',
        },
      ];

      lineChartLegend = true;
      lineChartPlugins = [];
      lineChartType = 'line';
    
    
    
//    BarChart
    barChartOptions: ChartOptions = {
        responsive: true,
      };
      barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
      barChartType: ChartType = 'bar';
      barChartLegend = true;
      barChartPlugins = [];

      barChartData: ChartDataSets[] = [
        { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
      ];
    
    
//    DonutChart
    doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
      doughnutChartData: MultiDataSet = [
        [55, 25, 20]
      ];
      doughnutChartType: ChartType = 'doughnut';

}
