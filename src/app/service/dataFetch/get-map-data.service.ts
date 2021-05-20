import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

//import stateRegions from '../../../assets/mapBoundry/stateCoor.json';
//import melbRegions from '../../../assets/mapBoundry/melb.json';
//import nswRegions from '../../../assets/mapBoundry/nswRegionCoor.json';
//import qlRegions from '../../../assets/mapBoundry/queensRegion.json';
//import saRegions from '../../../assets/mapBoundry/saRegions.json';
//import waRegions from '../../../assets/mapBoundry/waRegions.json';
//import ntRegions from '../../../assets/mapBoundry/ntRegions.json';
//import vicRegions from '../../../assets/mapBoundry/vicRegions.json';
//import sa4Regions from '../../../assets/mapBoundry/SA4_2011.json';

@Injectable({
  providedIn: 'root'
})
export class GetMapDataService {

    constructor() { }
    
    getStateService() {
      return '../../assets/mapBoundry/stateCoor.json';
    }
    getSA4Service() {
      return '../../assets/mapBoundry/SA4_2011.json';
    }
    getMelbService() {
      return '../../assets/mapBoundry/melb.json';
    }
    getNSWService() {
      return '../../assets/mapBoundry/nswRegionCoor.json';
    }
    getQLService() {
      return '../../assets/mapBoundry/queensRegion.json';
    }
    getSAService() {
      return '../../assets/mapBoundry/saRegions.json';
    }
    getWAService() {
      return '../../assets/mapBoundry/waRegions.json';
    }
    getNTService() {
      return '../../assets/mapBoundry/ntRegions.json';
    }
    getVicService() {
      return '../../assets/mapBoundry/vicRegions.json';
    }
    
    homeless_obj:any = "../../assets/mapBoundry/AURIN/SA2_homeless_2016.json"
    income_obj:any = "../../assets/mapBoundry/AURIN/SA2_income_2016.json"
    population_obj:any = "../../assets/mapBoundry/AURIN/SA2_population_2016.json"
    
    
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
}


