import { Component, OnInit } from '@angular/core';

import { MapsAPILoader } from '@agm/core';

import { GetMapDataService } from '../service/dataFetch/get-map-data.service';

import homeless_obj from "../../assets/mapBoundry/AURIN/SA2_homeless_2016.json";
import population_obj from "../../assets/mapBoundry/AURIN/SA2_population_2016.json";
import income_obj from "../../assets/mapBoundry/AURIN/SA2_income_2016.json";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit  {

    constructor(
        private _mapsAPILoader: MapsAPILoader,
         private _getMapData: GetMapDataService
    ) { }

    geoJsonObject: any;
    geoJsonObject1: any;
    lat: number;
    lng: number;
    zoom:number;   
    
    ngOnInit(): void {
        this.lat = -28;
        this.lng = 137;
        this.zoom = 4;
//        this.geoJsonObject = "../../assets/mapBoundry/SA4_2011.json";
        this.geoJsonObject1 = "../../assets/mapBoundry/AURIN/SA2.json";
//        console.log(this.geoJsonObject)
//        this._mapsAPILoader.load().then(() => {
//            this.getSA4DataF()
//        });
    }
    
    clicked(clickEvent) {
        console.log(clickEvent);
    }
    styleFunc(feature) {
        let name = feature.getProperty('sa2_name16');
        let whichMap = 0;
        
        let color = "#FFFFFF"
        if (whichMap == 0){
            //THe income map color
//            let income_value = this._getMapData.getDataFromSA2NameIncome(name);
            let income;
            
            for (let i = 0; i < income_obj.features.length; i++){
                if (income_obj.features[i].properties.sa2_name16 == name){
                    income = income_obj.features[i].properties.mean_aud_2014_15;
                    break;
                }
            }
            
//            color = this._getMapData.incomeColorConverter(income_value)
            if (income == null){
                // white
                color = "#FFFFFF"
            }

            if (income < 30000){
                //lightblue
                color = "#ADD8E6";

            }else if(income < 45000){
                //lightskyblue
                color = "#87CEFA";

            }else if(income < 60000){
                //deepskyblue
                color = "#00BFFF";

            }else if(income < 75000){
                //dodgerblue
                color = "#1E90FF";

            }else if(income < 90000){
                //blue
                color = "#0000FF";

            }else {
                //darkblue
                color = "#00008B";
            }


        }
        else if (whichMap == 1){
            //the population map color

//            let population = this._getMapData.getDataFromSA2NamePopulation(name)
            let population;
            
            for (let i = 0; i < population_obj.features.length; i++){
                if (population_obj.features[i].properties.sa2_name == name){
                    population = population_obj.features[i].properties.population;
                    break;
                }
            }
            
//            color = this._getMapData.populationColorConverter(population)
            if (population == null){
                // white
                color = "#FFFFFF"
            }

            if (population < 3000){
                //lightblue
                color = "#ADD8E6";

            }else if(population < 6000){
                //lightskyblue
                color = "#87CEFA";

            }else if(population < 10000){
                //deepskyblue
                color = "#00BFFF";

            }else if(population < 14000){
                //dodgerblue
                color = "#1E90FF";

            }else if(population < 18000){
                //blue
                color = "#0000FF";

            }else {
                //darkblue
                color = "#00008B";
            }
            
        }
        else if (whichMap == 2){
//            console.log(this);
//            let homeless = this._getMapData.getDataFromSA2NameHomeless(name)
            let homeless;
            
            for (let i = 0; i < homeless_obj.features.length; i++){
                if (homeless_obj.features[i].properties.sa2_name_2016 == name){
                    homeless = homeless_obj.features[i].properties.hl_p_homeless_tot
                    break;
                }
            }
            
            
//            console.log(homeless);
//            color = this._getMapData.homelessColorConverter(homeless)
            //homeless....
            if (homeless == null){
                // white
                color = "#FFFFFF"
            }

            if (homeless < 50){
                //lightblue
                color = "#ADD8E6";

            }else if(homeless < 100){
                //lightskyblue
                color = "#87CEFA";

            }else if(homeless < 150){
                //deepskyblue
                color = "#00BFFF";

            }else if(homeless < 200){
                //dodgerblue
                color = "#1E90FF";

            }else if(homeless < 300){
                //blue
                color = "#0000FF";

            }else {
                //darkblue
                color = "#00008B";
            }

        }
        
        return {
            fillColor: color,
            strokeWeight: 1,
            clickable: false
        };
    }
    
    
    
    
    
    changemapRegion(e){
        console.log(e.target.value)
        this.geoJsonObject1 = "../../assets/mapBoundry/"+e.target.value+".json";
    }
//
//    getSA4DataF(): void {
//      this._getMapData.getSA4Service()
//          .subscribe(StateData => {
//                this.lat = -28;
//                this.lng = 137;
//                this.zoom = 5;
//                this.geoJsonObject = StateData;
//            });
//    }
//    getStateDataF(): void {
//      this._getMapData.getStateService()
//          .subscribe(StateData => {
//                this.lat = -28;
//                this.lng = 137;
//                this.zoom = 5;
//                this.geoJsonObject = StateData;
//            });
//    }
//    getMelbDataF(): void {
//      this._getMapData.getMelbService()
//          .subscribe(MelbData => {
//                this.lat = -33;
//                this.lng = 147;
//                this.zoom = 6;
//                this.geoJsonObject = MelbData;
//            });
//    }
//    getNSWDataF(): void {
//      this._getMapData.getNSWService()
//          .subscribe(NSWData => {
//                this.lat = -33;
//                this.lng = 147;
//                this.zoom = 6;
//                this.geoJsonObject = NSWData;
//            });
//    }
//    getQLDataF(): void {
//      this._getMapData.getQLService()
//          .subscribe(QLData => this.geoJsonObject = QLData);
//    }
//    getSADataF(): void {
//      this._getMapData.getSAService()
//          .subscribe(SAData => this.geoJsonObject = SAData);
//    }
//    getWADataF(): void {
//      this._getMapData.getWAService()
//          .subscribe(WAData => this.geoJsonObject = WAData);
//    }
//    getNTDataF(): void {
//      this._getMapData.getNTService()
//          .subscribe(NTData => this.geoJsonObject = NTData);
//    }
//    getVicDataF(): void {
//      this._getMapData.getVicService()
//          .subscribe(VicData => this.geoJsonObject = VicData);
//    }
    
    

    
}
