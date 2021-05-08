import { Component, OnInit } from '@angular/core';

import { CrudOpsService } from '../service/RestApis/crud-ops.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _crudOps: CrudOpsService) { }

  
    
  ngOnInit(): void {
      
      this._crudOps.sendGetRequest().subscribe((data: any[])=>{
          console.log(data);
//          this.products = data;
        })

  }

}
