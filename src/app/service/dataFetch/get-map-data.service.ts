import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import stateRegions from '../../../assets/mapBoundry/stateCoor.json';
import melbRegions from '../../../assets/mapBoundry/melb.json';
import nswRegions from '../../../assets/mapBoundry/nswRegionCoor.json';
import qlRegions from '../../../assets/mapBoundry/queensRegion.json';
import saRegions from '../../../assets/mapBoundry/saRegions.json';
import waRegions from '../../../assets/mapBoundry/waRegions.json';
import ntRegions from '../../../assets/mapBoundry/ntRegions.json';
import vicRegions from '../../../assets/mapBoundry/vicRegions.json';
import sa4Regions from '../../../assets/mapBoundry/SA4_2011.json';

@Injectable({
  providedIn: 'root'
})
export class GetMapDataService {

    constructor() { }
    
    getStateService(): Observable<any> {
      const heroes = of(stateRegions);
      return heroes;
    }
    getSA4Service(): Observable<any> {
      const heroes = of(sa4Regions);
      return heroes;
    }
    getMelbService(): Observable<any> {
      const heroes = of(melbRegions);
      return heroes;
    }
    getNSWService(): Observable<any> {
      const heroes = of(nswRegions);
      return heroes;
    }
//    getQLService(): Observable<any> {
//      const heroes = of(qlRegions);
//      return heroes;
//    }
//    getSAService(): Observable<any> {
//      const heroes = of(saRegions);
//      return heroes;
//    }
//    getWAService(): Observable<any> {
//      const heroes = of(waRegions);
//      return heroes;
//    }
//    getNTService(): Observable<any> {
//      const heroes = of(ntRegions);
//      return heroes;
//    }
//    getVicService(): Observable<any> {
//      const heroes = of(vicRegions);
//      return heroes;
//    }
}


