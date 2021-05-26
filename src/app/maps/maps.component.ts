import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';

import { AgmMap } from '@agm/core';

import { GetMapDataService } from '../service/dataFetch/get-map-data.service';
import { CrudOpsService } from '../service/RestApis/crud-ops.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit,AfterViewInit   {
      @ViewChild(AgmMap) agmMap;
    
    constructor(
         private _getMapData: GetMapDataService,
          private _crudOps: CrudOpsService
    ) { }

    geoJsonObject: any;
    geoJsonObject1: any;
    lat: number = -28;
    lng: number = 137;
    zoom:number = 4;   
    whichMap:number = 2; 
//    sa2Url:String = this._getMapData.getSA2_URL();
    sa2Load:Boolean = false;
    stateUrl:String = this._getMapData.getStateService();
    
    ngOnInit(): void {}
    
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

    
    
    clicked(clickEvent) {
        console.log(clickEvent);
    }
    styleFunc = (feature) => { 
        
        let name = feature.getProperty('sa2_name16');
        
        
        let color = "#FFFFFF"
        
        if (this.whichMap == 0){
            //THe income map color
            let income_value = this._getMapData.getDataFromSA2NameIncome(name);
            color = this._getMapData.incomeColorConverter(income_value)
        }
        else if (this.whichMap == 1){
            //the population map color
            let population = this._getMapData.getDataFromSA2NamePopulation(name)
            color = this._getMapData.populationColorConverter(population)            
        }
        else if (this.whichMap == 2){
            //the homeless map color
            let homeless = this._getMapData.getDataFromSA2NameHomeless(name)
            color = this._getMapData.homelessColorConverter(homeless)
        }
//        else if (this.whichMap == 3){
//            this._crudOps.getAVGSentimentsBySA2Name(name,true).subscribe((data: any[])=>{
//          
//            if (data.rows.length > 0){
//                console.log("getAVGSentimentsBySA2NAme",name,data.rows[0]);
//            }
//        });
//        }
        
        return {
            fillColor: color,
            strokeWeight: 1,
            clickable: false
        };
    }
    
    changeScene(sc){
        
        if(sc == 'R'){
            this.whichMap = 3;
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
                    return this.styleFunc(feature);
                });
            });
        }
        
         

    }

    

    
}
