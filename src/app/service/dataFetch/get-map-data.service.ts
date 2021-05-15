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
}


