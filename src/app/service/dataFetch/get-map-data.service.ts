import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CrudOpsService } from '../RestApis/crud-ops.service';

@Injectable({
  providedIn: 'root'
})
export class GetMapDataService {

    private sa2_obj:any;
    private homeless_obj:any;
    private population_obj:any;
    private income_obj:any;
    private senti_obj:any;
    constructor(private _crudOps: CrudOpsService) {
        
        this._crudOps.getSa2().subscribe((data: any)=>{
            this.sa2_obj = data
        });
        this._crudOps.getHomeless_obj().subscribe((data: any)=>{
            this.homeless_obj = data
        });
        this._crudOps.getIncome_obj().subscribe((data: any)=>{
            this.income_obj = data
        });
        this._crudOps.getPopulation_obj().subscribe((data: any)=>{
            this.population_obj = data
        });
        this._crudOps.getAVGSentimentsBySA2Name(undefined,true).subscribe((data: any)=>{
            this.senti_obj = data;
        });
        
    }
    
    getStateService() {
      return '../../assets/mapBoundry/stateCoor.json';
    }
    
    getSA2_URL(){
        return this.sa2_obj;
    }
    
    
    // input the name of the suburb, output the number of homeless people in that area
    getDataFromSA2NameHomeless(name){
        for (let i = 0; i < this.homeless_obj.features.length; i++){
            if (this.homeless_obj.features[i].properties.sa2_name_2016 == name){
                return this.homeless_obj.features[i].properties.hl_p_homeless_tot
            }
        }
    }

    // input the name of the suburb, output the average income of that area
    getDataFromSA2NameIncome(name){
        for (let i = 0; i < this.income_obj.features.length; i++){
            if (this.income_obj.features[i].properties.sa2_name16 == name){
                return this.income_obj.features[i].properties.mean_aud_2014_15
            }
        }
    }
    // input the name of the suburb, output the population of that area
    getDataFromSA2NamePopulation(name){
        for (let i = 0; i < this.population_obj.features.length; i++){
            if (this.population_obj.features[i].properties.sa2_name == name){
                return this.population_obj.features[i].properties.population
            }
        }
    }
    // input the name of the suburb, output the population of that area
    getDataSenti(name){
        for (let i = 0; i < this.senti_obj.rows.length; i++){
            if (this.senti_obj.rows[i].key == name){
                return this.senti_obj.rows[i].value
            }
        }
    }
    
    // convert number of income to a color attribute
    incomeColorConverter(income){
        if (income == null){
            // white
            return "#FFFFFF"
        }

        if (income < 30000){
            //lightblue
            return "#ADD8E6";

        }else if(income < 45000){
            //lightskyblue
            return "#87CEFA";

        }else if(income < 60000){
            //deepskyblue
            return "#00BFFF";

        }else if(income < 75000){
            //dodgerblue
            return "#1E90FF";

        }else if(income < 90000){
            //blue
            return "#0000FF";

        }else {
            //darkblue
            return "#00008B";
        }

    }
    
    // convert population to a color attribute
    populationColorConverter(population){
        if (population == null){
            // white
            return "#FFFFFF"
        }

        if (population < 3000){
            //lightblue
            return "#ADD8E6";

        }else if(population < 6000){
            //lightskyblue
            return "#87CEFA";

        }else if(population < 10000){
            //deepskyblue
            return "#00BFFF";

        }else if(population < 14000){
            //dodgerblue
            return "#1E90FF";

        }else if(population < 18000){
            //blue
            return "#0000FF";

        }else {
            //darkblue
            return "#00008B";
        }

    }
    
    //homeless....
    homelessColorConverter(homeless){
        if (homeless == null){
            // white
            return "#FFFFFF"
        }

        if (homeless < 50){
            //lightblue
            return "#ADD8E6";

        }else if(homeless < 100){
            //lightskyblue
            return "#87CEFA";

        }else if(homeless < 150){
            //deepskyblue
            return "#00BFFF";

        }else if(homeless < 200){
            //dodgerblue
            return "#1E90FF";

        }else if(homeless < 300){
            //blue
            return "#0000FF";

        }else {
            //darkblue
            return "#00008B";
        }

    }
    
    //Sentiments Color....
    sentiColorConverter(sentiScore){
        if (sentiScore == 0){
            // white
            return "#FFFFFF"
        }
        if (sentiScore < 0.1){
            //lightblue
            return "#ADD8E6";

        }else if(sentiScore < 0.2){
            //lightskyblue
            return "#87CEFA";

        }else if(sentiScore < 0.3){
            //deepskyblue
            return "#00BFFF";

        }
        else if(sentiScore < 0.4){
            //dodgerblue
            return "#1E90FF";

        }else if(sentiScore < 0.5){
            //blue
            return "#0000FF";

        }else if(sentiScore < 0.6){
            //blue
            return "#AAAAFF";

        }else if(sentiScore < 0.7){
            //blue
            return "#436EEE";

        }else if(sentiScore < 0.8){
            //blue
            return "#838EDE";

        }else if(sentiScore < 0.9){
            //blue
            return "#2E37FE";

        }else {
            //darkblue
            return "#2F2F4F";
        }

    }
}


