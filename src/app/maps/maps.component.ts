import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';

import { AgmMap } from '@agm/core';

import { GetMapDataService } from '../service/dataFetch/get-map-data.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit,AfterViewInit   {
      @ViewChild(AgmMap) agmMap;
    
    constructor(
         private _getMapData: GetMapDataService,
    ) { }

    geoJsonObject: any;
    geoJsonObject1: any;
    lat: number = -28;
    lng: number = 137;
    zoom:number = 4;   
    whichMap:number = 2; 
    sa2Url:String = this._getMapData.getSA2_URL()
    
    ngOnInit(): void {}
    
    ngAfterViewInit() {        
        this.agmMap.mapReady.subscribe(map => {
            map.data.loadGeoJson(this.sa2Url);
            map.setZoom(this.zoom);
            map.setCenter({lat: this.lat, lng: this.lng})
            map.data.setStyle((feature) => {
                return this.styleFunc(feature);
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
        
        return {
            fillColor: color,
            strokeWeight: 1,
            clickable: false
        };
    }
    
    changemapRegion(e){
        this.geoJsonObject1 = "../../assets/mapBoundry/"+e.target.value+".json";
    }
    changeScene(e){
        this.whichMap = e.target.value
        this.agmMap._mapsWrapper.getNativeMap().then((map) => {
            map.data.setStyle((feature) => {
                return this.styleFunc(feature);
            });
        }); 

    }

    

    
}
