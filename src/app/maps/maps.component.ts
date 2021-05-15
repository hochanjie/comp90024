import { Component, OnInit } from '@angular/core';

import { MapsAPILoader } from '@agm/core';

//import { GetMapDataService } from '../service/dataFetch/get-map-data.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

    constructor(
        private _mapsAPILoader: MapsAPILoader,
//         private _getMapData: GetMapDataService
    ) { }

    geoJsonObject: any;
    lat: number;
    lng: number;
    zoom:number;    
    
    ngOnInit(): void {
        this.lat = -28;
        this.lng = 137;
        this.zoom = 5;
        this.geoJsonObject = "../../assets/mapBoundry/SA4_2011.json";
        console.log(this.geoJsonObject)
//        this._mapsAPILoader.load().then(() => {
//            this.getSA4DataF()
//        });
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
