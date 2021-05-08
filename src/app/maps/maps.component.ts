import { Component, OnInit } from '@angular/core';

import melbCoor from '../../assets/mapBoundry/melb.json';
import stateCoor from '../../assets/mapBoundry/stateCoor.json';
import nswRegionCoor from '../../assets/mapBoundry/nswRegionCoor.json';
import qlRegions from '../../assets/mapBoundry/queensRegion.json';
import saRegions from '../../assets/mapBoundry/saRegions.json';
import waRegions from '../../assets/mapBoundry/waRegions.json';
import ntRegions from '../../assets/mapBoundry/ntRegions.json';
import vicRegions from '../../assets/mapBoundry/vicRegions.json';

import { MapsAPILoader } from '@agm/core';

import { GetMapDataService } from '../service/dataFetch/get-map-data.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

    constructor(
        private _mapsAPILoader: MapsAPILoader,
         private _getMapData: GetMapDataService
    ) { }

    geoJsonObject: any;
    lat: number;
    lng: number;
    zoom:number;
    
    
    
    ngOnInit(): void {
        this._mapsAPILoader.load().then(() => {
            this.getStateDataF()
        });
    }
    clicked(clickEvent) {
        console.log(clickEvent);
    }
    styleFunc(feature) {
        return ({
            clickable: false,
            fillColor: feature.getProperty('color'),
            strokeWeight: 1
        });
    }
    
    changemapRegion(e){
        console.log(e.target.value)
        this.geoJsonObject = "../../assets/mapBoundry/"+e.target.value+".json";
    }

    getStateDataF(): void {
      this._getMapData.getStateService()
          .subscribe(StateData => {
                this.lat = -28;
                this.lng = 137;
                this.zoom = 5;
                this.geoJsonObject = StateData;
            });
    }
    getMelbDataF(): void {
      this._getMapData.getMelbService()
          .subscribe(MelbData => {
                this.lat = -33;
                this.lng = 147;
                this.zoom = 6;
                this.geoJsonObject = MelbData;
            });
    }
    getNSWDataF(): void {
      this._getMapData.getNSWService()
          .subscribe(NSWData => {
                this.lat = -33;
                this.lng = 147;
                this.zoom = 6;
                this.geoJsonObject = NSWData;
            });
    }
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
