import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
import { GetMapDataService } from '../service/dataFetch/get-map-data.service';
import { GetChartsDataService } from '../service/dataFetch/get-charts-data.service';
import { CrudOpsService } from '../service/RestApis/crud-ops.service';

import { ChartDataSets, ChartType, RadialChartOptions, ChartOptions } from 'chart.js';
import { Label,Color,MultiDataSet,SingleDataSet } from 'ng2-charts';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit,AfterViewInit {
      @ViewChild(AgmMap) agmMap;
    
    constructor(
        private _getMapData: GetMapDataService,
        private _getChartData: GetChartsDataService,
        private _crudOps: CrudOpsService
    ) { }

    
    geoJsonObject: any;
    lat: number = -28;
    lng: number = 137;
    zoom:number = 4;
    whichMap:number = 2; 
    sa2Load:Boolean = false;
    showScene:Boolean = true;
    stateUrl:String = this._getMapData.getStateService();
    markers:any;
    currentCity:any;
    getSentimentsByCity:any;
    getAvgSentimentsByCity:any;
    colorList = [];
    rangeList = [];
    selectedScene:string = 'R';
    scenarios = [{name:'Australia',clickId:'R'},{name:'Income',clickId:'0'},{name:'Population',clickId:'1'},{name:'Homeless',clickId:'2'},{name:'Sentiments',clickId:'3'}]
    
    selectedChart:string = 'R';
    scenariosChart = [{name:'Australia',clickId:'R'},{name:'Income',clickId:'income'},{name:'Density',clickId:'density'},{name:'Homeless Rate',clickId:'homelessRate'},{name:'Sentiments',clickId:'senti'}]
    
    selectedCity:string;
    status: boolean = false;
    status1: boolean = false;
    chartDefault: boolean = true;
    bar:Boolean = true;
    radar:Boolean = false;    
    
    ngOnInit(): void {
        this._crudOps.getAvgSentimentsByCity(undefined,true).subscribe((data: any)=>{
            this.getSentimentsByCity = data.rows;
        });       
    }
    
    
    ngAfterViewInit() {        
        this.agmMap.mapReady.subscribe(map => {
            map.data.loadGeoJson(this.stateUrl);
            map.setZoom(this.zoom);
            map.setCenter({lat: this.lat, lng: this.lng})
            map.data.setStyle({
                  fillColor: 'green',
                    strokeWeight: 1
                });
        });
    }
    
    changeCity(cityName){
        this.showScene = false;
        this._crudOps.getTweetsByCity(cityName,false).subscribe((data: any)=>{
            this.markers = data.rows
            this.currentCity = cityName;
        })
    }

    changeBar(barName){
        console.log(barName);
        if(barName == 'bar'){
            this.bar = true;
            this.radar = false;
        }else{
            this.radar = true;
            this.bar = false;
        }
    }

    containsObject(obj, list) {
        var x;
        for (x in list) {
            if (list.hasOwnProperty(x) && list[x] === obj) {
                return true;
            }
        }

        return false;
    }
    
    clicked(clickEvent) {
        console.log(clickEvent);
    }

    changeScene(sc){
        this.showScene = true;
        this.selectedScene = sc;
        this.colorList = [];
        this.rangeList = [];
        if(sc == 'R'){
            this.whichMap = 4;
            this.agmMap._mapsWrapper.getNativeMap().then((map) => {
                if(this.sa2Load){
                    map.data.forEach(function(feature) {
                        map.data.remove(feature);
                    });
                    map.data.loadGeoJson(this.stateUrl);
                    this.sa2Load = false;
                }
                map.data.setStyle({
                  fillColor: 'green',
                    strokeWeight: 1
                });
            });
        }else{
            this.whichMap = sc;
            this.agmMap._mapsWrapper.getNativeMap().then((map) => {
                if(!this.sa2Load){
                    map.data.forEach(function(feature) {
                        map.data.remove(feature);
                    });
                    map.data.addGeoJson(this._getMapData.getSA2_URL());
                    this.sa2Load = true;
                }
                map.data.setStyle((feature) => {
                   
                    if(!this.colorList.includes(this.styleFunc(feature).fillColor)){
                        this.colorList.push(this.styleFunc(feature).fillColor)
                        
                        this.rangeList.push(this.styleFunc(feature).range)
                        let tempList = this.rangeList.sort((a, b) => a - b)
                        this.rangeList = tempList
                    }
                    return this.styleFunc(feature);
                });
            });
            console.log(this.rangeList);
        }
    }
    
    styleFunc = (feature) => { 
        
        let name = feature.getProperty('sa2_name16');
        let color = "#FFFFFF"
        let range;
        
        if (this.whichMap == 0){
            //THe income map color
            let income_value = this._getMapData.getDataFromSA2NameIncome(name);
            color = this._getMapData.incomeColorConverter(income_value).color
            range = this._getMapData.incomeColorConverter(income_value).range
        }
        else if (this.whichMap == 1){
            //the population map color
            let population = this._getMapData.getDataFromSA2NamePopulation(name)
            color = this._getMapData.populationColorConverter(population).color            
            range = this._getMapData.populationColorConverter(population).range           
        }
        else if (this.whichMap == 2){
            //the homeless map color
            let homeless = this._getMapData.getDataFromSA2NameHomeless(name)
            color = this._getMapData.homelessColorConverter(homeless).color
            range = this._getMapData.homelessColorConverter(homeless).range
        }
        else if(this.whichMap == 3){
            let sentiScore = this._getMapData.getDataSenti(name)
            color = this._getMapData.sentiColorConverter(sentiScore).color
            range = this._getMapData.sentiColorConverter(sentiScore).range
        }
        return {
            fillColor: color,
            strokeWeight: 1,
            range:range
        };
    }
    
    cityZoom(city){
        let lat:number;
        let lng:number;
        let zoom:number = 10;
        if(city == 'Melbourne'){
            lat = -37.8136;
            lng = 144.9631;
        }else if(city == 'Sydney'){
            lat = -33.8688;
            lng = 151.2093;
        }else if(city == 'Brisbane'){
            lat = -27.4705;
            lng = 153.0260;
        }else if(city == 'Perth'){
            lat = -31.9523;
            lng = 115.8613;
        }else if(city == 'Adelaide'){
            lat = -34.9285;
            lng = 138.6007;
        }else{
            lat = -28;
            lng = 137;
            zoom = 4;
        }
        this.agmMap._mapsWrapper.getNativeMap().then((map) => {
            map.setZoom(zoom);
            map.setCenter({lat: lat, lng: lng});
        });
        

    }

    loadChart(scene){
        this.selectedChart = scene;
        if(scene == 'income'){
            this.chartDefault = false;
            this.barChartData = [{ data: [this._getChartData.getMelbourneChartData().income, this._getChartData.getSydneyChartData().income, this._getChartData.getBrisbaneChartData().income, this._getChartData.getPerthChartData().income, this._getChartData.getAdelaideChartData().income], label: 'income' }];
        }else if(scene == 'density'){
            this.chartDefault = false;
            this.barChartData = [{ data: [this._getChartData.getMelbourneChartData().density, this._getChartData.getSydneyChartData().density, this._getChartData.getBrisbaneChartData().density, this._getChartData.getPerthChartData().density, this._getChartData.getAdelaideChartData().density], label: 'Density' }];
        }else if(scene == 'homelessRate'){
            this.chartDefault = false;
            this.barChartData = [{ data: [this._getChartData.getMelbourneChartData().homeless_rate, this._getChartData.getSydneyChartData().homeless_rate, this._getChartData.getBrisbaneChartData().homeless_rate, this._getChartData.getPerthChartData().homeless_rate, this._getChartData.getAdelaideChartData().homeless_rate], label: 'homelessRate' }];
            
        }else if(scene == 'senti'){
            this.chartDefault = false;
            let dataNew:any[] = [];
            for (let i = 0, len = this.getSentimentsByCity.length; i < len; i++) {
                dataNew.push(this.round(this.getSentimentsByCity[i].value,5))
            }
            this.barChartData = [{ data: dataNew, label: 'Sentiments' }];
        }else{
            this.chartDefault = true;
        }


    }


//    BarChart
    barChartOptions: ChartOptions = {responsive: true};
      chartLabels: Label[] = ['Melbourne', 'Sydney', 'Brisbane', 'Perth', 'Adelaide'];
      barChartType: ChartType = 'bar';
      barChartLegend = true;
      barChartPlugins = [];

      barChartData: ChartDataSets[] = [
        { data: [], label: '' }
      ];

    radarChartOptions: RadialChartOptions = {responsive: true};
      radarChartLabels: Label[] = ['Melbourne', 'Sydney', 'Brisbane', 'Perth', 'Adelaide'];
      radarChartData: ChartDataSets[] = [];
      radarChartType: ChartType = 'radar';

        pieChartOptions: ChartOptions = {responsive: true,};
        pieChartLabels: Label[] = [['Melbourne'], ['Sydney'], ['Perth'], ['Adelaide'], 'Brisbane'];
        pieChartData: SingleDataSet = [30, 50, 20, 50, 20];
        pieChartType: ChartType = 'pie';
        pieChartLegend = true;
        pieChartPlugins = [];
    

    
    dropdownF(){
        this.status = !this.status; 
    }
    dropdownF1(){
        this.status1 = !this.status1; 
    }
    round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

}
