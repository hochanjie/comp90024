import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CrudOpsService } from '../RestApis/crud-ops.service';
import { GetMapDataService } from './get-map-data.service';

@Injectable({
  providedIn: 'root'
})


export class GetChartsDataService {
    
    private Melbourne_SA2_obj;
    private Adelaide_SA2_obj;
    private Brisbane_SA2_obj;
    private Perth_SA2_obj;
    private Sydney_SA2_obj;
    constructor(private _crudOps: CrudOpsService,private _getMapData: GetMapDataService) {
        this._crudOps.getSa2Adelaide().subscribe((data: any)=>{
            this.Adelaide_SA2_obj = data
        });
        this._crudOps.getSa2Brisbane().subscribe((data: any)=>{
            this.Brisbane_SA2_obj = data
        });
        this._crudOps.getSa2Melbourne().subscribe((data: any)=>{
            this.Melbourne_SA2_obj = data
        });
        this._crudOps.getSa2Perth().subscribe((data: any)=>{
            this.Perth_SA2_obj = data
        });
        this._crudOps.getSa2Sydney().subscribe((data: any)=>{
            this.Sydney_SA2_obj = data
        });
        
    }
    
    getMelbourneChartData(){
        let Melbourne_SA2_count:number = 0;
        let Melbourne_population:number = 0;
        let Melbourne_homeless:number = 0;
        let Melbourne_income:number = 0;
        let Melbourne_homeless_rate:number = 0;
        let Melbourne_density:number = 0;
        for (let j = 0; j < this.Melbourne_SA2_obj.features.length; j++){
            let SA2_name = this.Melbourne_SA2_obj.features[j].properties.sa2_name16
            let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name)
            let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name)
            let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name)

            Melbourne_population += SA2_population
            Melbourne_homeless += SA2_homeless
            Melbourne_income += SA2_population * SA2_income
            Melbourne_SA2_count = Melbourne_SA2_count + 1 

        }
        
        return {income:Melbourne_income / Melbourne_population,
        homeless_rate:Melbourne_homeless / Melbourne_population,
        density:Melbourne_population / 9992}
        
    }
    //Sydney----------------------
    getSydneyChartData(){ 
        let Sydney_SA2_count:number = 0;
        let Sydney_population:number = 0;
        let Sydney_homeless:number = 0;
        let Sydney_income:number = 0;
        let Sydney_homeless_rate:number = 0;
        let Sydney_density:number = 0; 
        for (let j = 0; j < this.Sydney_SA2_obj.features.length; j++){

            let SA2_name = this.Sydney_SA2_obj.features[j].properties.sa2_name16;
            let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name);
            let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name);
            let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name);

            Sydney_population += SA2_population
            Sydney_homeless += SA2_homeless
            Sydney_income += SA2_population * SA2_income
            Sydney_SA2_count = Sydney_SA2_count + 1 

        }
        
        return {income:Sydney_income / Sydney_population,
        homeless_rate:Sydney_homeless / Sydney_population,
        density:Sydney_population / 12368}
    }

    //Brisbane--------------------------------------------------------------------------------------
    getBrisbaneChartData(){
        let Brisbane_SA2_count:number = 0;
        let Brisbane_population:number = 0;
        let Brisbane_homeless:number = 0;
        let Brisbane_income:number = 0;
        let Brisbane_homeless_rate:number = 0;
        let Brisbane_density:number = 0;
        for (var j = 0; j < this.Brisbane_SA2_obj.features.length; j++){

            let SA2_name = this.Brisbane_SA2_obj.features[j].properties.sa2_name16
            let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name)
            let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name)
            let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name)

            Brisbane_population += SA2_population
            Brisbane_homeless += SA2_homeless
            Brisbane_income += SA2_population * SA2_income
            Brisbane_SA2_count = Brisbane_SA2_count + 1 

        }
        return {income:Brisbane_income / Brisbane_population,
        homeless_rate:Brisbane_homeless / Brisbane_population,
        density:Brisbane_population / 15842}
    }
    getPerthChartData(){
        let Perth_SA2_count:number = 0;
        let Perth_population:number = 0;
        let Perth_homeless:number = 0;
        let Perth_income:number = 0;
        let Perth_homeless_rate:number = 0;
        let Perth_density:number = 0;
    //Perth----------

        for (var j = 0; j < this.Perth_SA2_obj.features.length; j++){

            let SA2_name = this.Perth_SA2_obj.features[j].properties.sa2_name16
            let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name)
            let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name)
            let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name)

            Perth_population += SA2_population
            Perth_homeless += SA2_homeless
            Perth_income += SA2_population * SA2_income
            Perth_SA2_count = Perth_SA2_count + 1 

        }

        return {income:Perth_income / Perth_population,
        homeless_rate:Perth_homeless / Perth_population,
        density:Perth_population / 6300}
    }
    //Adelaide--------------------------------------------------------------------------------------
    getAdelaideChartData(){
        let Adelaide_SA2_count:number = 0;
        let Adelaide_population:number = 0;
        let Adelaide_homeless:number = 0;
        let Adelaide_income:number = 0;
        let Adelaide_homeless_rate:number = 0;
        let Adelaide_density:number = 0;
    for (var j = 0; j < this.Adelaide_SA2_obj.features.length; j++){

        let SA2_name = this.Adelaide_SA2_obj.features[j].properties.sa2_name16
        let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name)
        let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name)
        let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name)

        Adelaide_population += SA2_population
        Adelaide_homeless += SA2_homeless
        Adelaide_income += SA2_population * SA2_income
        Adelaide_SA2_count = Adelaide_SA2_count + 1 

    }
        return {income:Adelaide_income / Adelaide_population,
        homeless_rate:Adelaide_homeless / Adelaide_population,
        density:Adelaide_population / 3259}
    }
}
