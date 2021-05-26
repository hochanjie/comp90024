import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CrudOpsService } from '../RestApis/crud-ops.service';
import { GetMapDataService } from './get-map-data.service';

import Melbourne_SA2_obj from '../../../assets/mapBoundry/Melbourne.json';
import Adelaide_SA2_obj from '../../../assets/mapBoundry/Adelaide.json';
import Brisbane_SA2_obj from '../../../assets/mapBoundry/Brisbane.json';
import Perth_SA2_obj from '../../../assets/mapBoundry/Perth.json';
import Sydney_SA2_obj from '../../../assets/mapBoundry/Sydney.json';

@Injectable({
  providedIn: 'root'
})


export class GetChartsDataService {

    /*CHARTS START*/
    
    private Melbourne_SA2_count:number = 0;
    private Melbourne_population:number = 0;
    private Melbourne_homeless:number = 0;
    private Melbourne_income:number = 0;
    private Melbourne_homeless_rate:number = 0;
    private Melbourne_density:number = 0;
    
    private Sydney_SA2_count:number = 0;
    private Sydney_population:number = 0;
    private Sydney_homeless:number = 0;
    private Sydney_income:number = 0;
    private Sydney_homeless_rate:number = 0;
    private Sydney_density:number = 0; 
    
    private Brisbane_SA2_count:number = 0;
    private Brisbane_population:number = 0;
    private Brisbane_homeless:number = 0;
    private Brisbane_income:number = 0;
    private Brisbane_homeless_rate:number = 0;
    private Brisbane_density:number = 0;
    
    private Perth_SA2_count:number = 0;
    private Perth_population:number = 0;
    private Perth_homeless:number = 0;
    private Perth_income:number = 0;
    private Perth_homeless_rate:number = 0;
    private Perth_density:number = 0;

    
    private Adelaide_SA2_count:number = 0;
    private Adelaide_population:number = 0;
    private Adelaide_homeless:number = 0;
    private Adelaide_income:number = 0;
    private Adelaide_homeless_rate:number = 0;
    private Adelaide_density:number = 0;
    /*CHARTS END*/
    
    
    constructor(private _crudOps: CrudOpsService,private _getMapData: GetMapDataService) { 
//        this._crudOps.getAVGSentimentsBySA2Name(undefined,true).subscribe((data: any)=>{
//            this.senti_obj = data;
//        });
    }
    
    getMelbourneChartData(){
        for (let j = 0; j < Melbourne_SA2_obj.features.length; j++){
            let SA2_name = Melbourne_SA2_obj.features[j].properties.sa2_name16
            let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name)
            let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name)
            let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name)

            this.Melbourne_population += SA2_population
            this.Melbourne_homeless += SA2_homeless
            this.Melbourne_income += SA2_population * SA2_income
            this.Melbourne_SA2_count = this.Melbourne_SA2_count + 1 

        }
        
        return {income:this.Melbourne_income / this.Melbourne_population,
        density:this.Melbourne_homeless / this.Melbourne_population,
        homeless_rate:this.Melbourne_population / 9992}
        
    }
    //Sydney----------------------
    getSydneyChartData(){   
        for (let j = 0; j < Sydney_SA2_obj.features.length; j++){

            let SA2_name = Sydney_SA2_obj.features[j].properties.sa2_name16;
            let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name);
            let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name);
            let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name);

            this.Sydney_population += SA2_population
            this.Sydney_homeless += SA2_homeless
            this.Sydney_income += SA2_population * SA2_income
            this.Sydney_SA2_count = this.Sydney_SA2_count + 1 

        }
        
        return {income:this.Sydney_income / this.Sydney_population,
        density:this.Sydney_homeless / this.Sydney_population,
        homeless_rate:this.Sydney_population / 12368}
    }

    //Brisbane--------------------------------------------------------------------------------------
    getBrisbaneChartData(){
        for (var j = 0; j < Brisbane_SA2_obj.features.length; j++){

            let SA2_name = Brisbane_SA2_obj.features[j].properties.sa2_name16
            let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name)
            let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name)
            let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name)

            this.Brisbane_population += SA2_population
            this.Brisbane_homeless += SA2_homeless
            this.Brisbane_income += SA2_population * SA2_income
            this.Brisbane_SA2_count = this.Brisbane_SA2_count + 1 

        }
        return {income:this.Brisbane_income / this.Brisbane_population,
        density:this.Brisbane_homeless / this.Brisbane_population,
        homeless_rate:this.Brisbane_population / 15842}
    }
    getPerthChartData(){
    //Perth----------

        for (var j = 0; j < Perth_SA2_obj.features.length; j++){

            let SA2_name = Perth_SA2_obj.features[j].properties.sa2_name16
            let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name)
            let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name)
            let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name)

            this.Perth_population += SA2_population
            this.Perth_homeless += SA2_homeless
            this.Perth_income += SA2_population * SA2_income
            this.Perth_SA2_count = this.Perth_SA2_count + 1 

        }

        return {income:this.Perth_income / this.Perth_population,
        density:this.Perth_homeless / this.Perth_population,
        homeless_rate:this.Perth_population / 6300}
    }
    //Adelaide--------------------------------------------------------------------------------------
    getAdelaideChartData(){
    for (var j = 0; j < Adelaide_SA2_obj.features.length; j++){

        let SA2_name = Adelaide_SA2_obj.features[j].properties.sa2_name16
        let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name)
        let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name)
        let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name)

        this.Adelaide_population += SA2_population
        this.Adelaide_homeless += SA2_homeless
        this.Adelaide_income += SA2_population * SA2_income
        this.Adelaide_SA2_count = this.Adelaide_SA2_count + 1 

    }
        return {income:this.Adelaide_income / this.Adelaide_population,
        density:this.Adelaide_homeless / this.Adelaide_population,
        homeless_rate:this.Adelaide_population / 3259}
    }
}
