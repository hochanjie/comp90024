import { Component } from '@angular/core';
import { CrudOpsService } from './service/RestApis/crud-ops.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor( private api: CrudOpsService ) {
  }

  title = 'assignmentWeb';
}
